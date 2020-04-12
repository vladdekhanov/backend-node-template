import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';

import {UserDto} from '../../types/models/dto';
import {User} from '../../types/models/do';

import {UsersMapper} from './users.mapper';

import {DBKeys} from '../../enums/DBKeys';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(DBKeys.User) private readonly userRepository: Model<User>,
		private readonly usersMapper: UsersMapper
	) {
	}
	/**
	 * Create new user in memory storage (temporary)
	 */
	async create(userDto: UserDto, passwordHash: string): Promise<UserDto> {

		const user = this.usersMapper.toDo(userDto);

		user.passwordHash = passwordHash;

		const result = await this.userRepository.create(user);

		return this.usersMapper.toDto(result);
	}

	/**
	 * Find the user by unique email
	 */
	async findByEmail(email: string): Promise<UserDto | null> {
		const user = await this.userRepository.findOne({email}).exec();

		if (user) {
			return this.usersMapper.toDto(user);
		}

		return null;
	}

	/**
	 * Find the user by id
	 */
	async find(userId: string): Promise<UserDto | null> {
		const user = await this.userRepository.findById(userId).exec();

		if (user) {
			return this.usersMapper.toDto(user);
		}

		return null;
	}

	/**
	 * Find the user if entered password hash matches with stored hash
	 */
	async findIfMatch(
		email: string,
		password: string,
		compare: (password: string, userPasswordHash: string) => Promise<boolean>
	): Promise<UserDto | null> {
		const user = await this.userRepository.findOne({email}).exec();

		const isMatch = await compare(password, user.passwordHash);

		if (user && isMatch) {
			return this.usersMapper.toDto(user);
		}

		return null;
	}
}
