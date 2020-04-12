import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {UsersService} from './users.service';
import {UsersMapper} from './users.mapper';
import {UsersController} from './users.controller';
import {UsersSchema} from './users.schema';

import {DBKeys} from '../../enums/DBKeys';

@Module({
	imports: [MongooseModule.forFeature([{name: DBKeys.User, schema: UsersSchema}])],
	controllers: [UsersController],
	providers: [UsersService, UsersMapper],
	exports: [UsersService]
})
export class UsersModule {}
