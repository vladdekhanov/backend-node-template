import { Test, TestingModule } from '@nestjs/testing';
import {getModelToken} from '@nestjs/mongoose';

import {UserDto} from '../../../types/models/dto';

import {DBKeys} from '../../../enums/DBKeys';

import {UsersMapper} from '../users.mapper';
import { UsersService } from '../users.service';

import {mockUser} from '../../../../test/mocks/do/user';
import {mockUserDto} from '../../../../test/mocks/dto/user.dto';
import {mockRepository} from '../../../../test/mocks/repository';

describe('UsersService', () => {
	let service: UsersService;
	let usersRepositoryCreateSpy: jest.Mock = jest.fn().mockResolvedValue(mockUser());
	let usersRepositoryFindOneSpy: jest.Mock = jest.fn().mockReturnValue(mockRepository(mockUser()));
	let usersRepositoryFindByIdSpy: jest.Mock = jest.fn().mockReturnValue(mockRepository(mockUser()));

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				UsersMapper,
				{
					provide: getModelToken(DBKeys.User),
					useValue: {
						create: usersRepositoryCreateSpy,
						findOne: usersRepositoryFindOneSpy,
						findById: usersRepositoryFindByIdSpy
					},
				}
			]
		}).compile();

		service = module.get<UsersService>(UsersService);

		jest.restoreAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create user', async () => {
		const createdUser = mockUser();
		const userToBeCreated: UserDto = mockUserDto({id: undefined});

		const result = await service.create(userToBeCreated, 'testHash');

		expect(usersRepositoryCreateSpy).toHaveBeenCalledWith({
			passwordHash: createdUser.passwordHash,
			...userToBeCreated
		});

		expect(result).toEqual({...userToBeCreated, id: createdUser.id})
	});

	it('should request user by email', async() => {
		const user = mockUser();

		await service.findByEmail(user.email);

		expect(usersRepositoryFindOneSpy).toHaveBeenCalledWith({email: user.email});
	});

	it('should request user by id', async() => {
		const user = mockUser();

		await service.find(user.id);

		expect(usersRepositoryFindByIdSpy).toHaveBeenCalledWith(user.id);
	});

	it('should return user if passwords match', async() => {
		const userDto = mockUserDto();
		const user = mockUser();

		const result = await service.findIfMatch(userDto.email, 'test', () => Promise.resolve(true));

		expect(usersRepositoryFindOneSpy).toHaveBeenCalledWith({email: user.email});
		expect(result).toEqual(userDto);
	});

	it('should return null if passwords don\'t match', async() => {
		const userDto = mockUserDto();
		const user = mockUser();

		const result = await service.findIfMatch(userDto.email, 'test', () => Promise.resolve(false));

		expect(usersRepositoryFindOneSpy).toHaveBeenCalledWith({email: user.email});
		expect(result).toBeNull();
	})
});
