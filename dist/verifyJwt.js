import { verify, JsonWebTokenError, TokenExpiredError, NotBeforeError } from 'jsonwebtoken';
export const verifyJwt = (options) => (req, res, next) => {
    const { getToken = (req) => req.headers.authorization, secretOrPublicKey, assignPayloadTo = 'payload', } = options;
    const token = getToken(req);
    if (!token) {
        res.status(401).json({ message: 'No JWT provided' });
        return;
    }
    try {
        const decoded = verify(token, secretOrPublicKey);
        req[assignPayloadTo] = decoded;
        next();
    }
    catch (err) {
        if (err instanceof TokenExpiredError) {
            res.status(401).json({ message: 'Token expired' });
            return;
        }
        if (err instanceof NotBeforeError) {
            res.status(401).json({ message: 'Token not active yet' });
            return;
        }
        if (err instanceof JsonWebTokenError) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
        console.error('Unexpected JWT error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
};
