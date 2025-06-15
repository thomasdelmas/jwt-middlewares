import { Request, Response, NextFunction } from 'express';
export interface VerifyJwtOptions {
    getToken?: (req: Request) => string | undefined;
    secretOrPublicKey: string;
    assignPayloadTo?: string;
}
export declare const verifyJwt: (options: VerifyJwtOptions) => (req: Request, res: Response, next: NextFunction) => void;
