import {UserDto} from './dto/user.dto';

export type JwtPayload = {
	/**
	 * User without sensitive data
	 */
	user: UserDto;
	/**
	 * The "sub" (subject) claim identifies the principal that is the
	 * subject of the JWT.
	 */
	sub?: string;
	/**
	 * (issued at time): Time at which the JWT was issued.
	 * Can be used to determine age of the JWT
	 */
	iat?: number;
	/**
	 * (expiration time): Time after which the JWT expires
	 */
	exp?: number;
};
