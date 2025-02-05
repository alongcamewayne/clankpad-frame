import { Metadata } from 'next';
import type { FrameEmbed } from '@/lib/types';
import { TokenForm } from '@/components/TokenForm';
import { getBaseUrl } from '@/lib/utils';

const baseUrl = getBaseUrl();

const frameData: FrameEmbed = {
	version: 'next',
	imageUrl: `${baseUrl}/cp-frame.png`,
	button: {
		title: 'Create Token',
		action: {
			type: 'launch_frame',
			name: 'Create Token',
			url: baseUrl,
			splashImageUrl: `${baseUrl}/clankpad-sm.png`,
			splashBackgroundColor: '#000',
		},
	},
};

export const metadata: Metadata = {
	other: {
		'fc:frame': JSON.stringify(frameData),
	},
};

export default async function Home() {
	return (
		<div>
			<TokenForm />
		</div>
	);
}
