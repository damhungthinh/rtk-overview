import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Exception Interceptor for transform error codes to 502 when any exception happened
 */
@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        console.error(err);
        return throwError(
          () =>
            new HttpException(
              'Exception interceptor message',
              HttpStatus.BAD_GATEWAY,
            ),
        );
      }),
    );
  }
}
