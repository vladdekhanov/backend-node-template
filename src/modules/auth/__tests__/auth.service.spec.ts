import {Test, TestingModule} from '@nestjs/testing';

import {AuthService} from '../auth.service';
import {UsersService} from '../../users/users.service';
import {mockUserDto} from '../../../../test/mocks/dto/user.dto';
import {UnauthorizedException} from '@nestjs/common';

describe('AuthService', () => {
	let service: AuthService;
	let jwtServiceSignSpy: jest.Mock = jest.fn().mockReturnValue('signed');
	let usersServiceCreateSpy: jest.Mock = jest.fn().mockResolvedValue(mockUserDto());
	let usersServiceFindIfMatchSpy: jest.Mock = jest.fn();
	let usersServiceFindByEmailSpy: jest.Mock = jest.fn();
	let serviceEncryptPasswordSpy: jest.Mock = jest.fn().mockResolvedValue('testHash');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: 'UsersService',
					useValue: {
						create: usersServiceCreateSpy,
						findByEmail: usersServiceFindByEmailSpy,
						findIfMatch: usersServiceFindIfMatchSpy,
					}
				},
				{
					provide: 'JwtService',
					useValue: {
						sign: jwtServiceSignSpy
					}
				}
			],
		}).compile();

		service = module.get<AuthService>(AuthService);

		usersServiceFindIfMatchSpy.mockResolvedValue(mockUserDto());
		usersServiceFindByEmailSpy.mockResolvedValue(mockUserDto());

		service['encryptPassword'] = serviceEncryptPasswordSpy;
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should validate user by email and password and return user instance', async() => {
		const userDto = mockUserDto();

		const result = await service.validate(userDto.email, 'test');

		expect(usersServiceFindIfMatchSpy).toHaveBeenCalledTimes(1);
		expect(result).toEqual(userDto);
	});

	it('shouldn\'t validate user by email and password and throw unauthorized error', async() => {
		const userDto = mockUserDto();
		usersServiceFindIfMatchSpy.mockResolvedValue(null);

		const expected = service.validate(userDto.email, 'test');

		await expect(expected).rejects.toThrow(UnauthorizedException);
	});

	it('should login user by email and sign jwt token', async() => {
		const userDto = mockUserDto();

		const result = await service.login(userDto.email);

		expect(usersServiceFindByEmailSpy).toHaveBeenCalledWith(userDto.email);
		expect(result).toEqual({token: 'signed'});
	});

	it('shouldn\'t login user by email and throw unauthorized error', async() => {
		const userDto = mockUserDto();
		usersServiceFindByEmailSpy.mockResolvedValue(null);

		const expected = service.login(userDto.email);

		await expect(expected).rejects.toThrowError(UnauthorizedException);
	});

	it('should register through usersService', async() => {
		const userDto = mockUserDto();

		await service.register({email: userDto.email, name: userDto.name, password: 'test'});

		expect(serviceEncryptPasswordSpy).toHaveBeenCalledWith('test');
		expect(usersServiceCreateSpy).toHaveBeenCalledWith(
			{email: userDto.email, name: userDto.name},
			'testHash'
		);
	});

	it('should find user by email throw usersService', async() => {
		const userDto = mockUserDto();

		await service.findUserByEmail(userDto.email);

		expect(usersServiceFindByEmailSpy).toHaveBeenCalledWith(userDto.email);
	});
});
