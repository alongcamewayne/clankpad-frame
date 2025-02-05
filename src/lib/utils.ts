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

export function getBaseUrl() {
	if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
		return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
	}

	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`;
	}

	return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}
