'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from '@/components/ui/form';
import { submissionsTable } from '@/server/db/schema';
import { createInsertSchema } from 'drizzle-zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { formatSlug } from '@/lib/utils';

type FormSchema = z.infer<typeof formSchema>;

const formSchema = createInsertSchema(submissionsTable);

type TokenFormProps = {
	userFid?: number;
};

export function TokenForm({ userFid = 0 }: TokenFormProps) {
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			tokenName: '',
			tokenSymbol: '',
			imageUrl: '',
			channel: '',
			userFid,
		},
	});

	async function onSubmit(data: FormSchema) {
		console.log(data);
	}

	function handleChannelInput(event: React.ChangeEvent<HTMLInputElement>) {
		event.target.value = formatSlug(event.target.value);
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
								<Input placeholder="Degen" {...field} />
							</FormControl>
							<FormDescription>
								This is the name of your token. It can be anything you want.
							</FormDescription>
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
								<Input placeholder="DEGEN" {...field} />
							</FormControl>
							<FormDescription>Symbol</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="imageUrl"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Image</FormLabel>
							<FormControl>
								<Input type="file" {...field} value={field.value ?? ''} />
							</FormControl>
							<FormDescription>token Image</FormDescription>
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
								<Input placeholder="nouns" {...field} onChangeCapture={handleChannelInput} />
							</FormControl>
							<FormDescription>Warpcast channel</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" size="lg" className="w-full">
					Submit
				</Button>
			</form>
		</Form>
	);
}
