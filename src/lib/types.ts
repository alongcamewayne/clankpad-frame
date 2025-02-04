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
