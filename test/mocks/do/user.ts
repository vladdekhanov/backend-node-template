import {User} from '../../../src/types/models/do';

export const mockUser = (user?: Partial<User>): Partial<User> => ({
	id: 'abcdef12345',
	email: 'test@test.com',
	name: 'testName',
	passwordHash: 'testHash',
	...user
});
