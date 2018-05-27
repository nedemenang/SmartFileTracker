import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.load();

const secret = process.env.SECRET_TOKEN;

export default (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
  // verifies secret and checks exp
    jwt.verify(token, secret, (err, decoded) => {
      if (err) { // failed verification.
        return res.status(401).send({
          success: false,
          message: 'Token authentication failed'
        });
      }
      req.userData = decoded;
      if (decoded.role !== 'admin') {
        return res.status(403).send({
          success: false,
          message: 'You are not authorized to perform this action'
        });
      }
      next();
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'no token provided'
    });
  }
};