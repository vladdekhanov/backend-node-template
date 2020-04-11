import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule} from '@nestjs/config';

import {AuthService} from './auth.service';
import {LocalStrategy} from './local.strategy';
import {JwtStrategy} from './jwt.strategy';

import {AuthController} from './auth.controller';

import {UsersModule} from '../users/users.module';
import {Config} from '../../config';

@Module({
	imports: [
		ConfigModule.forRoot({envFilePath: process.cwd() + Config.ENV_PATH, isGlobal: true}),
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_TOKEN,
			signOptions: {expiresIn: process.env.JWT_TOKEN_EXPIRES_IN},
		}),
		UsersModule
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	exports: [AuthService]
})
export class AuthModule {}
