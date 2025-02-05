import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatSlug(slug: string) {
	return slug
		.toLowerCase()
		.replaceAll(' ', '-')
		.replace(/[^a-z0-9-]/g, '');
}
