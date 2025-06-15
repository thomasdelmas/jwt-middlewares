export const authorize = ({ requiredPermissions, getPermissions = (req) => req.payload?.permissions }) => (req, res, next) => {
    const userPermissions = getPermissions(req);
    if (!userPermissions) {
        res.status(403).json({ message: 'Permissions missing' });
        return;
    }
    const isAuthorized = requiredPermissions.every((perm) => userPermissions.includes(perm));
    if (!isAuthorized) {
        res.status(403).json({ message: 'Forbidden' });
        return;
    }
    next();
};
