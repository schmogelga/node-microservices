import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException, ConflictException } from "@nestjs/common"; 
import { Observable } from "rxjs";
import { BusinessError, NotFoundError, ConflictError } from "./BusinessErrors";
import { tap, catchError } from 'rxjs/operators';




@Injectable()
export class BusinessInterceptor implements NestInterceptor {

    intercept( context: ExecutionContext, next: CallHandler ): Observable<BusinessError>{

        return next.handle()
            .pipe( 
                catchError( (error: BusinessError) => {
                    

                    if( error instanceof NotFoundError ) throw new NotFoundException( error.message );
                    
                    if( error instanceof ConflictError ) throw new ConflictException( error.message );

                    throw error;

                })
            );
    }
}