import { Request, Response } from 'osik';
import './';
import { snatch } from './';

export interface PrextRequest extends Request {
  query: object;
  snatch: typeof snatch;
}

// https://github.com/do4ng/prext/issues/11

export interface PrextResponse extends Response {
  // default supported
  // json: (data: any) => void;
  html: (code: string) => this;
  send: (chunk: string | Array<any> | object | number, status?: number) => this;
  status: (code: number) => this;
}

export type requestHandler = (req: PrextRequest, res: PrextResponse) => void;
