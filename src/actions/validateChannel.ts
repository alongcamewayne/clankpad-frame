'use server';

export async function validateChannel(channel: string) {
	const response = await fetch(`https://api.warpcast.com/v1/channel?channelId=${channel}`);
	if (!response.ok) return { isValid: false, message: `Channel does not exist` };
	return { isValid: true };
}
