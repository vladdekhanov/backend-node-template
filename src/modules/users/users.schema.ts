import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
	name: {type: String, required: true},
	passwordHash: {type: String, required: true},
	email: {type: String, required: true}
});

