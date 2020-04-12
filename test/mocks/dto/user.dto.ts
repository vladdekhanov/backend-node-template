import {UserDto} from '../../../src/types/models/dto';

export const mockUserDto = (userDto?: Partial<UserDto>): UserDto => ({
	id: 'abcdef12345',
	email: 'test@test.com',
	name: 'testName',
	...userDto
});
