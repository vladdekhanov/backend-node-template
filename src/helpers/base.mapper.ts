/**
 * Base class for creations of mappers
 */
export abstract class BaseMapper<TObject, TTransportObject> {
	abstract toDo(entity: TTransportObject): Partial<TObject>;
	abstract toDto(entity: TObject): TTransportObject;

	protected toDoArray(entities: TTransportObject[]): Partial<TObject>[] {
		return entities.map(this.toDo);
	}

	protected toDToArray(entities: TObject[]): TTransportObject[] {
		return entities.map(this.toDto);
	}
}
