import {Module} from '@nestjs/common';

import {ExampleService} from './example.service';
import {ExampleController} from './example.controller';
import {ExampleRepository} from './example.repository';

@Module({
	imports: [],
	controllers: [ExampleController],
	providers: [ExampleService, ExampleRepository],
})
export class ExampleModule {}
