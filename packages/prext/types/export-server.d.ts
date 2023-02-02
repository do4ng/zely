import { SardRequest, SardResponse } from 'sard.js';

export function handles(
  req: SardRequest,
  res: SardResponse,
  routes: {
    file: string;
    m: any;
    modulePath: string;
    type: string;
  }[]
);
