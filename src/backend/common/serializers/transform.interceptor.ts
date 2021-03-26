import { BaseRepository } from "@/backend/models/base.repository";
import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClassConstructor } from "class-transformer";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable()
export class TransformInterceptor<T, U> implements NestInterceptor<T> {
	constructor(
		@InjectRepository(BaseRepository)
		private readonly repository: BaseRepository<T>,
		private readonly toDto: ClassConstructor<U>
	) {}

	async intercept(
		context: ExecutionContext,
		next: CallHandler
	): Promise<Observable<any>> {
		const now: any = Date.now();
		return next.handle().pipe(
			map((data) => this.repository.transform(this.toDto, data)),
			tap(() => console.log(`${Date.now() - now}ms`))
		);
	}
}
