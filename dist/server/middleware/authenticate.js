'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();

var secret = process.env.SECRET_TOKEN;

exports.default = function (req, res, next) {
  var token = req.headers.authorization.split(" ")[1];
  if (token) {
    // verifies secret and checks exp
    _jsonwebtoken2.default.verify(token, secret, function (err, decoded) {
      if (err) {
        // failed verification.
        return res.status(401).send({
          success: false,
          message: 'failed to authenticate token; Please re-login'
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