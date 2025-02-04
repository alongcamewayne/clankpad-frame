import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Channel } from './types';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function getChannels() {
	const response = await fetch('https://api.warpcast.com/v2/all-channels');
	if (!response.ok) throw new Error('Failed to fetch channels');
	const data = await response.json();
	const channels = (data.result.channels as Channel[]).map(({ id }) => id);
	channels.sort((a, b) => a.localeCompare(b));
	return channels;
}

export function formatSlug(slug: string) {
	return slug
		.toLowerCase()
		.replaceAll(' ', '-')
		.replace(/[^a-z0-9-]/g, '');
}
