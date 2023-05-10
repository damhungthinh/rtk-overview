import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ExceptionInterceptor },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class CoreModule {}
