import * as mongoose from 'mongoose';

export type User = mongoose.Document & {
	name: string;
	passwordHash: string;
	email: string;
};
