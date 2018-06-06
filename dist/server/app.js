'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();
// Set up the express app
var app = (0, _express2.default)();

// Log requests to the console.
app.use((0, _morgan2.default)('dev'));

// Parse incoming requests data 
app.use('/dist/server/uploads', _express2.default.static(_path2.default.resolve(__dirname, './uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use('/vendors/css', _express2.default.static(_path2.default.resolve(__dirname, '../vendors/css')));
}
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use(_express2.default.static(_path2.default.resolve(__dirname, '../client')));

(0, _index2.default)(app);

var port = parseInt(process.env.PORT, 10) || 3000;

app.listen(port, function () {
  console.log('We are live on ' + port);
});

app.get('/*', function (req, res) {
  if (process.env.NODE_ENV !== 'production') {
    res.sendFile(_path2.default.join(__dirname, '../client/index.html'));
  } else {
    res.sendFile(_path2.default.join(__dirname, '../client/index.html'));
  }
});

exports.default = app;