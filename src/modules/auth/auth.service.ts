import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {JwtPayload} from '../../types/models';
import {UserDto} from '../../types/models/dto';
import {ResponseLoginDto} from '../../types/models/dto/response';
import {RequestLoginDto, RequestRegisterUser} from '../../types/models/dto/request';

import {UsersService} from '../users/users.service';
import {UsersMapper} from '../users/users.mapper';
import {Config} from '../../config';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly usersMapper: UsersMapper
	) {}

	/**
	 * Validation of the user
	 */
	async validate(name: string, password: string): Promise<UserDto | null> {
		const user = await this.usersService.findByEmail(name);

		if (!user) {
			throw new UnauthorizedException();
		}

		const isMatch = await this.comparePasswords(password, user.passwordHash);
		if (user && isMatch) {
			return this.usersMapper.toDto(user);
		}

		return null;
	}

	/**
	 * Signing jwt token for logged user
	 */
	async login({email}: RequestLoginDto): Promise<ResponseLoginDto | null> {
		const user = await this.usersService.getUserByEmail(email);

		if (user === null) {
			throw new UnauthorizedException();
		}

		const payload: JwtPayload = {user, sub: user.id};

		return {
			token: this.jwtService.sign(payload),
		};
	}

	/**
	 * Register new user
	 */
	async register(request: RequestRegisterUser): Promise<UserDto> {
		const passwordHash = await this.encryptPassword(request.password);

		const user: UserDto = {
			name: request.name,
			email: request.email
		};

		return this.usersService.create(user, passwordHash);
	}

	/**
	 * Provide user without sensitive data from storage
	 */
	public async getUserByEmail(
		email: string
	): Promise<UserDto | null> {
		return this.usersService.getUserByEmail(email);
	}

	/**
	 * Compare entered password with actual password hash of the user
	 */
	private comparePasswords(password: string, userPasswordHash: string): Promise<boolean> {
		return bcrypt.compare(password, userPasswordHash);
	}

	/**
	 * Create hash from new user password
	 */
	private encryptPassword(password: string): Promise<string> {
		return bcrypt.hash(password, Config.SALT_ROUNDS);
	}
}
