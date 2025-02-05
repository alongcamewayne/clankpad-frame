/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import sdk from '@farcaster/frame-sdk';
import { getTokenData } from '@/actions/getTokenData';
import { truncateAddress } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function Page() {
	const { address } = useParams();
	const [isSDKLoaded, setIsSDKLoaded] = useState(false);
	const [tokenData, setTokenData] = useState<Awaited<ReturnType<typeof getTokenData>>>();

	useEffect(() => {
		const load = async () => {
			sdk.actions.ready();
		};
		if (sdk && !isSDKLoaded) {
			setIsSDKLoaded(true);
			load();
		}
	}, [isSDKLoaded]);

	useEffect(() => {
		if (address && typeof address === 'string') getTokenData({ address }).then(setTokenData);
	}, [address]);

	if (!tokenData) return <div>Loading...</div>;

	return (
		<div className="flex flex-col gap-4 p-5">
			<div className="flex items-center gap-4">
				<img
					src={tokenData.imageUrl}
					alt="token image"
					className="aspect-square h-24 rounded-full border-2 shadow-lg"
				/>

				<div>
					<p>{tokenData.tokenName}</p>
					<p>${tokenData.tokenSymbol}</p>
					<p>Contract address: {truncateAddress(tokenData.address)}</p>
				</div>
			</div>

			<div className="flex flex-wrap gap-2">
				<Button
					variant="link"
					className="p-0 text-base underline"
					onClick={() => sdk.actions.openUrl(`https://basescan.org/address/${tokenData.address}`)}>
					BaseScan
				</Button>

				<Button
					variant="link"
					className="p-0 text-base underline"
					onClick={() => sdk.actions.openUrl(`https://clank.fun/t/${tokenData.address}`)}>
					clank.fun
				</Button>
			</div>

			<p>
				Created by:{' '}
				<Button
					variant="link"
					className="p-0 text-base underline"
					onClick={() => sdk.actions.viewProfile({ fid: tokenData.userFid })}>
					{tokenData.userName}
				</Button>{' '}
				in{' '}
				<Button
					variant="link"
					className="p-0 text-base underline"
					onClick={() =>
						sdk.actions.openUrl(`https://warpcast.com/~/channel/${tokenData.channel}`)
					}>
					/{tokenData.channel}
				</Button>
				.
			</p>
		</div>
	);
}
