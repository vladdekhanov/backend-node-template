import {Injectable} from '@nestjs/common';
import {ExampleRepository} from './example.repository';

@Injectable()
export class ExampleService {
	constructor(private readonly exampleRepository: ExampleRepository) {}
	get(): string {
		return this.exampleRepository.get();
	}
}
