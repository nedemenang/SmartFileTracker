'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (app) {
    // add a new user
    app.post('/role', _authenticateAdmin2.default, _role2.default.create);

    // get roles
    app.get('/role', _role2.default.list);

    // get single role
    app.get('/role/:roleId', _role2.default.retrieve);

    //update role
    app.put('/role', _authenticateAdmin2.default, _role2.default.update);
};

var _Validator = require('../utilities/Validator');

var _Validator2 = _interopRequireDefault(_Validator);

var _role = require('../controllers/role');

var _role2 = _interopRequireDefault(_role);

var _authenticateAdmin = require('../middleware/authenticateAdmin');

var _authenticateAdmin2 = _interopRequireDefault(_authenticateAdmin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }