import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleRepository {
	get(): string {
		return 'Hello World!';
	}
}
