import { Request, Response, NextFunction } from 'express';

export interface AuthorizeOptions {
  requiredPermissions: string[];
  getPermissions?: (req: Request) => string[] | undefined;
}

export const authorize =
  ({ requiredPermissions, getPermissions = (req) => (req as any).payload?.permissions }: AuthorizeOptions) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const userPermissions = getPermissions(req);

    if (!userPermissions) {
      res.status(403).json({ message: 'Permissions missing' });
			return;
    }

    const isAuthorized = requiredPermissions.every((perm) =>
      userPermissions.includes(perm),
    );

    if (!isAuthorized) {
      res.status(403).json({ message: 'Forbidden' });
			return;
    }

    next();
  };
