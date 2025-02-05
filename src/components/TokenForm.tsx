'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import sdk, { type Context } from '@farcaster/frame-sdk';
import { toast } from 'sonner';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createToken } from '@/actions/createToken';
import { uploadImage } from '@/actions/uploadImage';
import { validateChannel } from '@/actions/validateChannel';
import { formatSlug } from '@/lib/utils';

export type Schema = z.infer<typeof schema>;

const schema = z.object({
	tokenName: z.string().nonempty(),
	tokenSymbol: z.string().nonempty(),
	image: z
		.instanceof(File)
		.refine((file) => file.size < 2000000, {
			message: 'Your resume must be less than 2MB.',
		})
		.optional(),
	userFid: z.number().int().default(0),
	channel: z.string().nonempty(),
});

export function TokenForm() {
	const router = useRouter();
	const [isSDKLoaded, setIsSDKLoaded] = useState(false);
	const [context, setContext] = useState<Context.FrameContext>();

	useEffect(() => {
		const load = async () => {
			setContext(await sdk.context);
			sdk.actions.ready();
		};
		if (sdk && !isSDKLoaded) {
			setIsSDKLoaded(true);
			load();
		}
	}, [isSDKLoaded]);

	function handleSlugInput(event: React.ChangeEvent<HTMLInputElement>) {
		event.target.value = formatSlug(event.target.value);
	}

	const form = useForm<Schema>({
		resolver: zodResolver(schema),
		defaultValues: {
			tokenName: '',
			tokenSymbol: '',
			channel: '',
		},
	});

	async function onSubmit(formData: Schema) {
		const { isValid, message } = await validateChannel(formData.channel);
		if (!isValid) {
			toast.error(message);
			return;
		}

		const { success, data } = await createToken({
			tokenName: formData.tokenName,
			tokenSymbol: formData.tokenSymbol,
			imageUrl: await uploadImage(formData.image),
			userFid: context!.user.fid,
			channel: formData.channel,
		});

		if (!success) {
			toast.error('Something went wrong. Please try again.');
			return;
		}

		toast.success(`$${formData.tokenSymbol} created! Redirecting to the token page...`);
		await new Promise((resolve) => setTimeout(resolve, 2500));
		router.push(`/tokens/${data.tokenAddress}`);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto flex max-w-lg flex-col gap-4">
				<FormField
					control={form.control}
					name="tokenName"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Name *</FormLabel>
							<FormControl>
								<Input placeholder="Ethereum" {...field} required />
							</FormControl>
							<FormDescription>Enter the full name of your token (e.g., Ethereum).</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="tokenSymbol"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Symbol *</FormLabel>
							<FormControl>
								<Input placeholder="ETH" {...field} required />
							</FormControl>
							<FormDescription>Enter the short symbol for your token (e.g., ETH).</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="image"
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					render={({ field: { value, onChange, ...fieldProps } }) => (
						<FormItem>
							<FormLabel className="font-semibold">Image</FormLabel>
							<FormControl>
								<Input
									{...fieldProps}
									type="file"
									accept="image/*"
									onChange={(event) => onChange(event.target.files && event.target.files[0])}
								/>
							</FormControl>
							<FormDescription>Upload a logo for your token. (optional)</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="channel"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Channel *</FormLabel>
							<FormControl>
								<Input placeholder="nouns" {...field} required onChangeCapture={handleSlugInput} />
							</FormControl>
							<FormDescription>
								Enter the Farcaster channel where the token announcement will be posted (e.g.,
								@yourchannel).
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					size="lg"
					className="w-full"
					disabled={!context || form.formState.isSubmitting}>
					{form.formState.isSubmitting ? 'Launching...' : 'Launch Token'}
				</Button>
			</form>
		</Form>
	);
}
