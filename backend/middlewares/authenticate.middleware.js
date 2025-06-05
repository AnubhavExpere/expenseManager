import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if ( !accessToken ) 
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        //if the verification of token fails then authentication fails
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export {verifyToken};