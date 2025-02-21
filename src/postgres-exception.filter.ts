import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError)
export class PostgresExceptionFilter implements ExceptionFilter {
  catch(
    exception: QueryFailedError & {
      code?: string;
      detail?: string;
      table?: string;
      constraint?: string;
    },
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Map error code to HTTP status (fallback: 400)
    const status =
      exception.code === '23505' ? HttpStatus.CONFLICT : HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: status,
      code: exception.code, // PostgreSQL code
      message: exception.detail || exception.message, // Detailed message
      table: exception.table, // Affected table
      constraint: exception.constraint, // Violated constraint
    });
  }
}
