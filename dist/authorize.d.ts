import { Request, Response, NextFunction } from 'express';
export interface AuthorizeOptions {
    requiredPermissions: string[];
    getPermissions?: (req: Request) => string[] | undefined;
}
export declare const authorize: ({ requiredPermissions, getPermissions }: AuthorizeOptions) => (req: Request, res: Response, next: NextFunction) => void;
