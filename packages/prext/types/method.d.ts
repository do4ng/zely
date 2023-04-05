import { Request, Response } from 'osik';
import './';

export interface PrextRequest extends Request {
  query: object;
}

// https://github.com/do4ng/prext/issues/11

export interface PrextResponse extends Response {
  // default supported
  // json: (data: any) => void;
  html: (code: string) => this;
  send: (code: string) => this;
  status: (code: number) => this;
}

export type requestHandler = (req: PrextRequest, res: PrextResponse) => void;
