"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require("../models");

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    createFile: function createFile(req, res) {
        return _models.Folder.findOne({
            where: {
                FileNo: req.body.fileNo
            }
        }).then(function (folderExists) {
            if (folderExists) {
                return res.status(400).send({
                    success: false,
                    message: 'File no already exists'
                });
            }
            return _models.Folder.create({
                FileNo: req.body.fileNo,
                CreateOn: Date.now(),
                Name: req.body.fileName,
                CurrentDepartment: req.body.currentDepartment,
                FileDescription: req.body.fileDescription,
                FileLink: req.file.path,
                Createdby: req.userData.userName
            }).then(function (folder) {
                return res.status(201).send({
                    success: true,
                    data: folder,
                    message: 'file successfully created'
                });
            }).catch(function (error) {
                return res.status(400).send(error);
            });
        });
    },
    retrieveById: function retrieveById(req, res) {
        return _models.Folder.findById(req.params.fileId, {
            include: [{
                model: _models.FileMovement,
                attributes: ['id', 'DateMoved', 'movedFromDepartmentId', 'movedToDepartmentId', 'movedBy'],
                as: 'FileMovements'
            }, {
                model: _models.FileNote,
                attributes: ['id', 'DateCreated', 'notes', 'notesBy'],
                as: 'FileNotes'
            }]
        }).then(function (folder) {
            return res.status(201).send(folder);
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },
    retrieveByNo: function retrieveByNo(req, res) {
        return _models.Folder.findById(req.params.fileNo, {
            include: [{
                model: _models.FileNote,
                attributes: ['id', 'DateCreate', 'Notes', 'NotesBy'],
                as: 'FileNotes'
            }, {
                model: _models.FileMovement,
                attributes: ['id', 'DateMoved', 'movedFromDepartmentId', 'movedToDepartmentId', 'movedBy', 'movedTo'],
                as: 'FileMovements'
            }]
        }).then(function (folder) {
            return res.status(201).send(folder);
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },
    list: function list(req, res) {
        return _models.Folder.all({
            where: {
                isActive: true
            } }).then(function (fileList) {
            return res.status(201).send({
                success: true,
                files: fileList,
                message: 'Files fetched successfully'
            });
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },
    listByDepartment: function listByDepartment(req, res) {
        return _models.Folder.all({
            where: {
                isActive: true,
                CurrentDepartment: req.params.departmentId
            } }).then(function (fileList) {
            return res.status(201).send({
                success: true,
                files: fileList,
                message: 'Files fetched successfully'
            });
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },
    listFileMovementsForFile: function listFileMovementsForFile(req, res) {
        return _models.FileMovement.all({
            where: {
                folderId: req.params.fileId
            } }).then(function (fileMovements) {
            return res.status(201).send({
                success: true,
                fileMovements: fileMovements,
                message: 'File Movements fetched successfully'
            });
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },
    listFileNotesForFile: function listFileNotesForFile(req, res) {
        return _models.FileNote.all({
            where: {
                folderId: req.params.fileId
            } }).then(function (fileNotes) {
            return res.status(201).send({
                success: true,
                fileNotes: fileNotes,
                message: 'File Notes fetched successfully'
            });
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },
    update: function update(req, res) {
        return _models.Folder.findById(req.body.folderId).then(function (folder) {
            if (!folder) {
                return res.status(404).send({
                    message: 'Folder not found'
                });
            }
            return folder.update({
                FileNo: req.body.fileNo || folder.fileNo,
                FileHash: req.body.fileHash || folder.fileHash,
                CurrentDepartment: req.body.currentDepartment || folder.currentDepartment,
                FileDescription: req.body.fileDescription || folder.fileDescription,
                FileLink: req.body.fileLink || folder.fileLink
            }).then(function (department) {
                return res.status(200).send(folder);
            }).catch(function (error) {
                return res.status(400).send(error);
            });
        });
    },
    CreateFileMovement: function CreateFileMovement(req, res) {
        if (req.body.movedFromDepartment === req.body.movedToDepartment) {
            return res.status(400).send({
                message: 'Please select different department to move to!'
            });
        }
        return _models.Folder.findById(req.body.folderId).then(function (folder) {
            if (!folder) {
                return res.status(404).send({
                    message: 'Folder not found'
                });
            }
            _models.FileMovement.create({
                DateMoved: Date.now(),
                movedFromDepartment: req.body.movedFromDepartment,
                movedToDepartment: req.body.movedToDepartment,
                movedBy: req.userData.userName,
                folderId: req.body.folderId
            }).then(function (fileMovement) {
                folder.update({
                    CurrentDepartment: req.body.movedToDepartment || folder.currentDepartment
                }).then(function () {
                    return res.status(200).send({
                        success: true,
                        message: 'File moved successfully',
                        fileMovement: fileMovement
                    });
                }).catch(function (error) {
                    return res.status(400).send(error);
                });
            }).catch(function (error) {
                return res.status(400).send(error);
            });
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },
    CreateFileNote: function CreateFileNote(req, res) {
        return _models.FileNote.create({
            DateCreated: Date.now(),
            notes: req.body.fileNote,
            folderId: req.body.folderId,
            notesBy: req.userData.userName
        }).then(function (fileNote) {
            return res.status(201).send({
                success: true,
                data: fileNote,
                message: 'File note added'
            });
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    }
};