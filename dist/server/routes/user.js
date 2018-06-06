'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (app) {
    // add a new user
    app.post('/signup', _authenticateAdmin2.default, _user2.default.create);

    app.put('/passwordreset', _user2.default.passwordReset);

    app.post('/signin', _user2.default.signIn);

    app.post('/signUpInitial', _user2.default.createWithAdmin);

    app.get('/users', _user2.default.list);

    app.put('/user', _authenticateAdmin2.default, _user2.default.update);
};

var _Validator = require('../utilities/Validator');

var _Validator2 = _interopRequireDefault(_Validator);

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

var _authenticateAdmin = require('../middleware/authenticateAdmin');

var _authenticateAdmin2 = _interopRequireDefault(_authenticateAdmin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }