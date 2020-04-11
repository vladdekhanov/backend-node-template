import {Body, Controller, Post, UseGuards} from '@nestjs/common';

import {RequestLoginDto, RequestRegisterUser} from '../../types/models/dto/request';
import {ResponseLoginDto} from '../../types/models/dto/response';
import {UserDto} from '../../types/models/dto';

import {LocalAuthGuard} from './guards/local-auth.guard';

import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Body() request: RequestLoginDto): Promise<ResponseLoginDto> {
		return this.authService.login(request);
	}

	@Post('register')
	async register(@Body() request: RequestRegisterUser): Promise<UserDto> {
		return this.authService.register(request);
	}
}
