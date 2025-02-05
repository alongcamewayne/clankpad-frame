'use server';

import { PinataSDK } from 'pinata-web3';

const pinata = new PinataSDK({
	pinataJwt: String(process.env.PINATA_JWT),
	pinataGateway: String(process.env.PINATA_GATEWAY),
});

export async function uploadImage(image: File | undefined) {
	if (!image) return '';
	const upload = await pinata.upload.file(image);
	return `https://${process.env.PINATA_GATEWAY}/ipfs/${upload.IpfsHash}`;
}
