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
	async findByEmail(email: string): Promise<User | null> {
		return this.userRepository.findOne({email}).exec();
	}

	/**
	 * Find the user by id
	 */
	async find(userId: number): Promise<User | null> {
		return this.userRepository.findById(userId).exec();
	}

	/**
	 * Return user without sensitive data from storage
	 */
	public async getUserByEmail(
		email: string
	): Promise<UserDto | null> {
		const user = await this.findByEmail(email);

		if (user) {
			return this.usersMapper.toDto(user);
		}

		return null;
	}

	/**
	 * Return user without sensitive data from storage
	 */
	public async getUser(userId: number): Promise<UserDto | null> {
		const user = await this.find(userId);

		if (user) {
			return this.usersMapper.toDto(user);
		}

		return null;
	}
}
