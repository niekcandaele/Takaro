import { Request, Response, NextFunction } from 'express';
import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  HttpError,
} from 'routing-controllers';
import { logger, errors } from '@takaro/util';
import { apiResponse } from '../util/apiResponse.js';
import { ValidationError } from 'class-validator';

const log = logger('errorHandler');

@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  // This next parameter is not used but it's needed for express to recognize this function as an error handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(originalError: Error, req: Request, res: Response, next: NextFunction) {
    let status = 500;
    let parsedError = new errors.InternalServerError();

    if (originalError.name === 'BadRequestError') {
      if (originalError.hasOwnProperty('errors')) {
        // @ts-expect-error Error typing is weird in ts... but we validate during runtime so should be OK
        const validationErrors = originalError['errors'] as ValidationError[];
        parsedError = new errors.ValidationError(
          'Validation error',
          validationErrors
        );
      }
    }

    if (originalError instanceof HttpError) {
      status = originalError.httpCode;
    }

    if (originalError.name === 'UniqueViolationError') {
      status = 409;
      parsedError = new errors.ConflictError(parsedError.message);
    }

    if (originalError instanceof errors.TakaroError) {
      status = originalError.http;
      parsedError = originalError;
    }

    log.error(originalError);
    if (status >= 500) {
      log.error(`🔴 FAIL ${req.method} ${req.originalUrl}`, parsedError);
    } else {
      log.warn(`⚠️ FAIL ${req.method} ${req.originalUrl}`, parsedError);
    }

    res.status(status).json(apiResponse({}, { error: parsedError }));
    return res.end();
  }
}
