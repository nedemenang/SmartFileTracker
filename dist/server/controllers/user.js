'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../models');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _paginate = require('../middleware/paginate');

var _paginate2 = _interopRequireDefault(_paginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    create: function create(req, res) {
        return _models.User.findOne({
            where: {
                UserName: req.body.userName
            }
        }).then(function (userNameExists) {
            if (userNameExists) {
                return res.status(400).send({
                    success: false,
                    message: 'Username already exists'
                });
            }
            _bcrypt2.default.hash('Password1', 10, function (err, hash) {
                if (err) {
                    return res.status(500).send({
                        success: false,
                        message: 'error occurred: ' + err
                    });
                } else {
                    return _models.User.create({
                        FirstName: req.body.firstName,
                        LastName: req.body.lastName,
                        UserName: req.body.userName,
                        password: hash,
                        createdBy: req.userData.userName,
                        role: req.body.role,
                        departmentId: req.body.department,
                        isActive: true
                    }).then(function (user) {
                        return res.status(201).send({
                            success: true,
                            data: user,
                            message: 'User successfully created'
                        });
                    }).catch(function (error) {
                        return res.status(400).send(error);
                    });
                }
            });
        });
    },
    createWithAdmin: function createWithAdmin(req, res) {
        return _models.User.findOne({
            where: {
                UserName: req.body.userName
            }
        }).then(function (userNameExists) {
            if (userNameExists) {
                return res.status(400).send({
                    success: false,
                    message: 'Username already exists'
                });
            }
            _bcrypt2.default.hash('Password1', 10, function (err, hash) {
                if (err) {
                    return res.status(500).send({
                        success: false,
                        message: 'error occurred: ' + err
                    });
                } else {
                    return _models.User.create({
                        FirstName: req.body.firstName,
                        LastName: req.body.lastName,
                        UserName: req.body.userName,
                        password: hash,
                        createdBy: 'admin',
                        role: req.body.role,
                        departmentId: req.body.department,
                        isActive: true
                    }).then(function (user) {
                        return res.status(201).send({
                            success: true,
                            data: user,
                            message: 'User successfully created'
                        });
                    }).catch(function (error) {
                        return res.status(400).send(error);
                    });
                }
            });
        });
    },
    list: function list(req, res) {
        return _models.User.findAndCountAll().then(function (users) {
            return res.status(200).send({
                success: true,
                userList: users,
                message: 'users fetched successfully'
            });
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },
    signIn: function signIn(req, res) {
        var secret = process.env.SECRET_TOKEN;
        return _models.User.findOne({
            where: {
                UserName: req.body.userName,
                isActive: true
            }
        }).then(function (user) {
            if (!user) {
                return res.status(401).send({
                    success: false,
                    message: 'Incorrect username or password'
                });
            }
            _bcrypt2.default.compare(req.body.userPassword, user.password, function (err, result) {
                if (err) {
                    return res.status(401).send({
                        success: false,
                        message: 'Incorrect username or password'
                    });
                }
                if (result) {
                    var token = _jsonwebtoken2.default.sign({
                        userName: user.UserName,
                        role: user.role,
                        department: user.departmentId
                    }, secret, {
                        expiresIn: "1h"
                    });
                    return res.status(200).send({
                        success: true,
                        token: token,
                        user: user,
                        message: 'Authentication successful'
                    });
                }
                return res.status(401).send({
                    success: false,
                    message: 'Authentication failed'
                });
            });
        });
    },
    update: function update(req, res) {
        return _models.User.findOne({
            where: {
                UserName: req.body.UserName
            }
        }).then(function (user) {
            if (!user) {
                return res.status(404).send({
                    message: 'user Not Found'
                });
            }
            return user.update({
                isActive: false
            }).then(function (user) {
                return res.status(200).send({
                    user: user,
                    success: true,
                    message: 'user deactivated!' });
            }).catch(function (error) {
                return res.status(400).send(error);
            });
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },
    passwordReset: function passwordReset(req, res) {
        return _models.User.findOne({
            where: {
                UserName: req.body.userName
            }
        }).then(function (user) {
            if (!user) {
                return res.status(400).send({
                    success: false,
                    message: 'Username does not exist'
                });
            }
            _bcrypt2.default.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    return res.status(500).send({
                        success: false,
                        message: 'error occurred: ' + err
                    });
                } else {
                    return user.update({
                        password: hash
                    }).then(function (user) {
                        return res.status(200).send({
                            user: user,
                            success: true,
                            message: 'password successfully updated!' });
                    }).catch(function (error) {
                        return res.status(400).send(error);
                    });
                }
            });
        });
    }
};