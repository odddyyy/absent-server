import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { DateFormat } from 'src/utils/date.utility';
@Catch(HttpException)
export class ErrorHandler implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    Logger.warn(message, 'ERROR HANDLED');
    response.status(status).json({
      meta: {
        code: status,
        timestamp: DateFormat.GMT(7),
        method: request.method,
        path: request.url,
      },
      error: {
        message,
      },
    });
  }
}
