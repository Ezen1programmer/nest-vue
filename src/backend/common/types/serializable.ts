export class Serializable<T> {
	public constructor(public readonly serialize: () => Promise<T | T[]>) {}
}
