'use server';

import type { Schema } from '@/components/TokenForm';

type CreateTokenArgs = Omit<Schema, 'image'> & { imageUrl: string };

export async function createToken(data: CreateTokenArgs) {
	console.log(data);
	return { success: true, data: { tokenAddress: '0x1d008f50fb828ef9debbbeae1b71fffe929bf317' } };
}
