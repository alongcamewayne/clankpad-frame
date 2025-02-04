import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const submissionsTable = sqliteTable('submissionsTable', {
	id: int().primaryKey({ autoIncrement: true }),
	userFid: int().notNull(),
	ticker: text().notNull(),
	tokenName: text().notNull(),
	imageUrl: text(),
	channel: text(),
});
