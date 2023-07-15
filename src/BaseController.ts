import httpCodes from 'http-codes';
import { Response } from 'express';
import { isObject } from 'lodash';

export default class BaseController {
  serverError: (res: Response, errr: any) => any;
  badRequest: (res: Response, errors: any, message?: string) => any;
  success: (res: Response, data: any) => any;
  created: (res: Response, data: any) => any;
  unAuthorized: (res: Response, error: any) => any;
  notFound: (res: Response, error: any) => any;
  noContent: (res: Response) => any;
  constructor() {
    this.serverError = (res, errr) =>
      res.status(httpCodes.INTERNAL_SERVER_ERROR).json(errr);

    this.badRequest = (res, errors, message = '') => {
      const err = isObject(errors)
        ? errors
        : {
            errors,
            message: message || 'Bad request',
            code: httpCodes.BAD_REQUEST,
          };

      return res.status(httpCodes.BAD_REQUEST).json(err);
    };

    this.success = (res, data) => res.status(httpCodes.OK).json(data);

    this.created = (res, data) => res.status(httpCodes.CREATED).json(data);

    this.unAuthorized = (res, error) =>
      res.status(httpCodes.UNAUTHORIZED).json(error);

    this.notFound = (res, error) => res.status(httpCodes.NOT_FOUND).json(error);

    this.noContent = (res) => res.status(httpCodes.NO_CONTENT).send();
  }
}
