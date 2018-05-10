import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

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
          message: 'failed to authenticate token'
        });
      }
      req.userData = decoded;
      next(); // no error, proceed
    });
  } else {
    // forbidden without token
    return res.status(403).send({
      success: false,
      message: 'no token provided'
    });
  }
};