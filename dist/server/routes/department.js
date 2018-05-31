'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (app) {
    // add a new department
    app.post('/department', _authenticate2.default, _department2.default.create);

    // get all departments
    app.get('/departments', _department2.default.list);

    // get single department
    app.get('/department/:departmentId', _department2.default.retrieve);

    // edit single department
    app.put('/department', _department2.default.update);
};

var _Validator = require('../utilities/Validator');

var _Validator2 = _interopRequireDefault(_Validator);

var _department = require('../controllers/department');

var _department2 = _interopRequireDefault(_department);

var _authenticate = require('../middleware/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }