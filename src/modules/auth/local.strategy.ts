import {ContextIdFactory, ModuleRef} from '@nestjs/core';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';

import {UserDto} from '../../types/models/dto';

import {AuthService} from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly moduleRef: ModuleRef
	) {
		super({
			passReqToCallback: true,
			usernameField: 'email'
		});
	}

	/**
	 * Validate entered username and password by user
	 */
	async validate(request: Request, email: string, password: string): Promise<UserDto> {
		// Resolve context based authService
		const contextId = ContextIdFactory.getByRequest(request);
		const authService = await this.moduleRef.resolve(AuthService, contextId);

		const user = await authService.validate(email, password);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
