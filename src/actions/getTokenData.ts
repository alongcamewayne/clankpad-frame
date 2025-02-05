'use server';

import type { Schema } from '@/components/TokenForm';

type GetTokenDataResult = Omit<Schema, 'image'> & {
	address: string;
	imageUrl: string;
	userName: string;
};

export async function getTokenData({ address }: { address: string }): Promise<GetTokenDataResult> {
	return {
		tokenName: 'Wayne Bucks',
		tokenSymbol: 'WBX',
		address,
		channel: 'waynesworld',
		userFid: 191317,
		userName: 'alongcamewayne',
		imageUrl:
			'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/6e5a31e1-a9aa-4a2a-d537-bcf5042e6d00/original',
	};
}
