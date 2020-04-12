import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {JwtPayload} from '../../types/models';
import {UserDto} from '../../types/models/dto';
import {ResponseLoginDto} from '../../types/models/dto/response';
import {RequestRegisterUser} from '../../types/models/dto/request';

import {UsersService} from '../users/users.service';
import {Config} from '../../config';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService
	) {}

	/**
	 * Validation of the user
	 */
	async validate(email: string, password: string): Promise<UserDto | null> {
		const user = await this.usersService.findIfMatch(
			email,
			password,
			this.comparePasswords
		);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}

	/**
	 * Signing jwt token for logged user
	 */
	async login(email: string): Promise<ResponseLoginDto | null> {
		const user = await this.usersService.findByEmail(email);

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
	public async findUserByEmail(
		email: string
	): Promise<UserDto | null> {
		return this.usersService.findByEmail(email);
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
