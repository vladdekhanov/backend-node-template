import {Injectable} from '@nestjs/common';

import {BaseMapper} from '../../helpers/base.mapper';

import {User} from '../../types/models/do';
import {UserDto} from '../../types/models/dto';

@Injectable()
export class UsersMapper extends BaseMapper<User, UserDto> {
	toDo(entity: UserDto): Partial<User> {
		return {
			name: entity.name,
			email: entity.email,
			passwordHash: ''
		};
	}

	toDto(entity: User): UserDto {
		return {
			id: entity.id,
			name: entity.name,
			email: entity.email
		};
	}
}
