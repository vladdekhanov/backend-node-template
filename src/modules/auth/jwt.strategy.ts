import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {ContextIdFactory, ModuleRef} from '@nestjs/core';

import {JwtPayload} from '../../types/models';
import {UserDto} from '../../types/models/dto';

import {AuthService} from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		private readonly moduleRef: ModuleRef
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('JWT_TOKEN'),
			passReqToCallback: true
		});
	}

	/**
	 * Return the user data which will be attached to current request
	 */
	async validate(request: Request, payload: JwtPayload): Promise<UserDto | null> {
		const {user: {email}} = payload;

		// Resolve context based usersService
		const contextId = ContextIdFactory.getByRequest(request);
		const authService = await this.moduleRef.resolve(AuthService, contextId);

		return authService.findUserByEmail(email);
	}
}
