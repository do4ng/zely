import { SardRequest, SardResponse } from 'sard.js';

export interface PrextRequest extends SardRequest {}
export interface PrextResponse extends SardResponse {
  json: (data: any) => void;
}

export type requestHandler = (req: PrextRequest, res: PrextResponse) => void;
