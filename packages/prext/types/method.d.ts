import { SardRequest, SardResponse } from 'sard.js';
import './';
import 'sard.js';

export interface PrextRequest extends SardRequest {
  query: object;
}

// https://github.com/do4ng/prext/issues/11

export interface PrextResponse extends SardResponse {
  json: (data: any) => void;
  html: (code: string) => this;
  send: (code: string) => this;
  status: (code: number) => this;
}

export type requestHandler = (req: PrextRequest, res: PrextResponse) => void;
