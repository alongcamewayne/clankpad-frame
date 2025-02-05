export interface Channel {
	id: string;
	url: string;
	name: string;
	description: string;
	descriptionMentions: number[];
	descriptionMentionsPositions: number[];
	imageUrl: string;
	headerImageUrl?: string;
	leadFid: number;
	moderatorFids: number[];
	createdAt: number;
	followerCount: number;
	memberCount: number;
	publicCasting: boolean;
	externalLink?: {
		title: string;
		url: string;
	};
	pinnedCastHash?: string;
}

export interface FrameEmbed {
	// Frame spec version. Required.
	// Example: "next"
	version: 'next';

	// Frame image.
	// Max 512 characters.
	// Image must be 3:2 aspect ratio and less than 10 MB.
	// Example: "https://yoink.party/img/start.png"
	imageUrl: string;

	// Button attributes
	button: {
		// Button text.
		// Max length of 32 characters.
		// Example: "Yoink Flag"
		title: string;

		// Action attributes
		action: {
			// Action type. Must be "launch_frame".
			type: 'launch_frame';

			// App name
			// Max length of 32 characters.
			// Example: "Yoink!"
			name: string;

			// Frame launch URL.
			// Max 512 characters.
			// Example: "https://yoink.party/"
			url: string;

			// Splash image URL.
			// Max 512 characters.
			// Image must be 200x200px and less than 1MB.
			// Example: "https://yoink.party/img/splash.png"
			splashImageUrl: string;

			// Hex color code.
			// Example: "#eeeee4"
			splashBackgroundColor: string;
		};
	};
}
