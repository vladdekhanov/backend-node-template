import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {ExampleModule} from './modules/example/example.module';
import {AuthModule} from './modules/auth/auth.module';
import {UsersModule} from './modules/users/users.module';

@Module({
	imports: [
		MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}),
		AuthModule,
		UsersModule,
		ExampleModule
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
