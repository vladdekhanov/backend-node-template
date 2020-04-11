import {Controller, Get, Request, UseGuards} from '@nestjs/common';

import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
	@UseGuards(JwtAuthGuard)
	@Get('profile')
	profile(@Request() req) {
		return req.user;
	}
}
