import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const submissionsTable = sqliteTable('submissionsTable', {
	id: int().primaryKey({ autoIncrement: true }),
	userFid: int().notNull(),
	tokenName: text().notNull(),
	tokenSymbol: text().notNull(),
	imageUrl: text(),
	channel: text().notNull(),
	castHash: text(),
});
