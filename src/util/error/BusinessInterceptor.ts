import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException } from "@nestjs/common"; 
import { Observable } from "rxjs";
import { BusinessError } from "./BusinessError";
import { tap, catchError } from 'rxjs/operators';
import { NotFoundError } from "./NotFoundError";



@Injectable()
export class BusinessInterceptor implements NestInterceptor {

    intercept( context: ExecutionContext, next: CallHandler ): Observable<BusinessError>{

        return next.handle()
            .pipe( 
                catchError( (error: BusinessError) => {
                    
                    if( error instanceof NotFoundError )
                    {
                        throw new NotFoundException( error.message );
                    }

                    throw error;

                })
            );
    }
}