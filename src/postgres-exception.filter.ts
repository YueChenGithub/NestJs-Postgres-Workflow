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

    // Only return status 400 bad request, can define more there
    const status = HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: status,
      postgresCode: exception.code, // PostgreSQL code
      message: exception.detail || exception.message, // Detailed message
      table: exception.table, // Affected table
      constraint: exception.constraint, // Violated constraint
    });
  }
}
