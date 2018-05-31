'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (app) {
    // USER API ENDPOINTS
    (0, _user2.default)(app);
    // DEPARTMENT API ENDPOINTS
    (0, _department2.default)(app);
    // FILE API ENDPOINTS
    (0, _folder2.default)(app);
    // ROLE API ENDPOINTS
    (0, _role2.default)(app);
};

var _department = require('./department');

var _department2 = _interopRequireDefault(_department);

var _folder = require('./folder');

var _folder2 = _interopRequireDefault(_folder);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _role = require('./role');

var _role2 = _interopRequireDefault(_role);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }