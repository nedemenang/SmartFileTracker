'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('../models');

exports.default = {
    create: function create(req, res) {
        return _models.Role.findOne({
            where: {
                name: req.body.name
            }
        }).then(function (roleExists) {
            if (roleExists) {
                return res.status(400).send({
                    success: false,
                    message: 'Role already exists'
                });
            }
            return _models.Role.create({
                name: req.body.name,
                createdBy: req.body.createdBy
            }).then(function (role) {
                return res.status(201).send({
                    success: true,
                    data: role,
                    message: 'Role successfully created'
                });
            }).catch(function (error) {
                return res.status(400).send(error);
            });
        });
    },
    list: function list(req, res) {
        return _models.Role.all({
            where: {
                isActive: true
            }
        }).then(function (roles) {
            return res.status(200).send(roles);
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },
    retrieve: function retrieve(req, res) {
        return _models.Role.findById(req.params.roleId).then(function (role) {
            if (!role) {
                return res.status(404).send({
                    message: 'record not found'
                });
            }
            return res.status(200).send(role);
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },
    update: function update(req, res) {
        return _models.Role.findById(req.params.roleId).then(function (role) {
            if (!role) {
                return res.status(404).send({
                    message: 'role not found!'
                });
            }
            return role.update({
                name: req.body.name || role.name,
                isActive: req.body.isActive || role.isActive
            }).then(function (role) {
                return res.status(200).send(role);
            }).catch(function (error) {
                return res.status(400).send(error);
            });
        });
    }
};