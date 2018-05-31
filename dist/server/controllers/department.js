"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require("../models");

exports.default = {
    create: function create(req, res) {
        return _models.Department.findOne({
            where: {
                name: req.body.departmentName
            }
        }).then(function (departmentExists) {
            if (departmentExists) {
                return res.status(400).send({
                    success: false,
                    message: 'Department already exists'
                });
            }
            return _models.Department.create({
                name: req.body.departmentName,
                createdBy: req.userData.userName
            }).then(function (department) {
                return res.status(201).send({
                    success: true,
                    department: department,
                    message: 'Department successfully created'
                });
            }).catch(function (error) {
                return res.status(400).send(error);
            });
        });
    },
    list: function list(req, res) {
        return _models.Department.all({
            where: {
                isActive: true
            }
        }).then(function (departments) {
            return res.status(200).send({
                success: true,
                departments: departments,
                message: 'Departments fetched successfully'
            });
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },
    retrieve: function retrieve(req, res) {
        return _models.Department.findById(req.params.departmentId, {
            include: [{
                model: _models.User,
                attributes: ['id', 'FirstName', 'LastName', 'UserName'],
                as: 'Users'
            }]
        }).then(function (department) {
            if (!department) {
                return res.status(404).send({
                    message: 'Department Not Found'
                });
            }
            return res.status(200).send(department);
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },
    update: function update(req, res) {
        return _models.Department.findOne({
            where: {
                name: req.body.name
            }
        }).then(function (department) {
            if (!department) {
                return res.status(404).send({
                    message: 'Department Not Found'
                });
            }
            return department.update({
                isActive: false
            }).then(function (department) {
                return res.status(200).send({
                    department: department,
                    success: true,
                    message: 'Department deactivated!' });
            }).catch(function (error) {
                return res.status(400).send(error);
            });
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    }
};