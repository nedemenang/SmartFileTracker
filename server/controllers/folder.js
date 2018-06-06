import {Folder} from "../models";
import {FileMovement} from "../models";
import {FileNote} from "../models";
import Sequelize from 'sequelize';

export default {
    createFile(req, res) {
        return Folder
            .findOne({
                where: {
                    FileNo: req.body.fileNo
                }
            }).then((folderExists) => {
                if(folderExists) {
                    return res.status(400).send({
                        success: false,
                        message: 'File no already exists'
                    });
                }
                return Folder 
                    .create({
                        FileNo : req.body.fileNo,
                        CreateOn : (new Date()).toLocaleString('en-GB'),
                        Name: req.body.fileName,
                        CurrentDepartment : req.body.currentDepartment,
                        FileDescription : req.body.fileDescription,
                        FileLink : req.file.path,
                        Createdby : req.userData.userName,
                    })
                    .then(folder => res.status(201).send({
                        success: true,
                        data: folder,
                        message: 'file successfully created'
                    }))
                    .catch(error => res.status(400).send(error));
            });
            
    },
    retrieveById(req, res) {
        return Folder
            .findById(req.params.fileId, {
                include: [{
                    model: FileMovement,
                    attributes: ['id', 'DateMoved', 'movedFromDepartmentId','movedToDepartmentId','movedBy'],
                    as: 'FileMovements'
                }, {
                    model: FileNote, 
                    attributes: ['id', 'DateCreated', 'notes', 'notesBy'],
                    as: 'FileNotes'
                }]
            })
            .then(folder => res.status(201).send(folder))
            .catch(error => res.status(400).send(error));
    },

    retrieveByNo(req, res) {
        return Folder
            .findById(req.params.fileNo, {
                include: [{
                    model: FileNote, 
                    attributes: ['id', 'DateCreate', 'Notes', 'NotesBy'],
                    as: 'FileNotes'
                }, {
                    model: FileMovement,
                    attributes: ['id', 'DateMoved', 'movedFromDepartmentId','movedToDepartmentId','movedBy','movedTo'],
                    as: 'FileMovements'
                }]
            })
            .then(folder => res.status(201).send(folder))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        return Folder
            .all({
                where: {
                    isActive: true
                }})
            .then(fileList => res.status(201).send({
                success: true,
                files: fileList,
                message: 'Files fetched successfully'
            }))
            .catch(error => res.status(400).send(error));
    },

    listByDepartment(req, res) {
        return Folder
            .all({
                where: {
                    isActive: true,
                    CurrentDepartment: req.params.departmentId
                }})
            .then(fileList => res.status(201).send({
                success: true,
                files: fileList,
                message: 'Files fetched successfully'
            }))
            .catch(error => res.status(400).send(error));
    },

    listFileMovementsForFile(req, res) {
        return FileMovement
            .all({
                where: {
                    folderId: req.params.fileId
                }})
            .then(fileMovements => res.status(201).send({
                success: true,
                fileMovements: fileMovements,
                message: 'File Movements fetched successfully'
            }))
            .catch(error => res.status(400).send(error));
    },
    listFileNotesForFile(req, res) {
        return FileNote
            .all({
                where: {
                    folderId: req.params.fileId
                }})
            .then(fileNotes => res.status(201).send({
                success: true,
                fileNotes: fileNotes,
                message: 'File Notes fetched successfully'
            }))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return Folder
            .findById(req.body.id)
            .then(folder => {
                if (!folder) {
                    return res.status(404).send({
                        message: 'Folder not found'
                    });
                }
                return folder
                    .update({
                        isActive: false
                        // FileNo : req.body.fileNo || folder.fileNo,
                        // FileHash : req.body.fileHash || folder.fileHash,
                        // CurrentDepartment : req.body.currentDepartment || folder.currentDepartment,
                        // FileDescription : req.body.fileDescription || folder.fileDescription,
                        // FileLink : req.body.fileLink || folder.fileLink
                    })
                    .then((folder) => res.status(200).send({
                        success: true,
                        folder: folder,
                        message: 'File deactivated'
                    }))
                    .catch((error) => res.status(400).send(error));
            })
    },

    CreateFileMovement(req, res) {
        if (req.body.movedFromDepartment === req.body.movedToDepartment) {
            return res.status(400).send({
                message: 'Please select different department to move to!'
            });
        }
        return Folder
        .findById(req.body.folderId)
        .then(folder => {
            if(!folder) {
                return res.status(404).send({
                        message: 'Folder not found'
                })
            }
            FileMovement
            .create({
                DateMoved: (new Date()).toLocaleString('en-GB'),
                movedFromDepartment: req.body.movedFromDepartment,
                movedToDepartment: req.body.movedToDepartment,
                movedBy: req.userData.userName,
                folderId: req.body.folderId
            })
            .then((fileMovement) => {
                folder
                    .update({
                        CurrentDepartment: req.body.movedToDepartment || folder.currentDepartment
                    })
                    .then(() => res.status(200).send({
                        success: true,
                        message: 'File moved successfully',
                        fileMovement: fileMovement
                    }))
                    .catch((error) => res.status(400).send(error))
            })
            .catch((error) => res.status(400).send(error))
        })
        .catch((error) => res.status(400).send(error)) 
    },

    CreateFileNote(req, res) {
        return FileNote
            .create({
                DateCreated: (new Date()).toLocaleString('en-GB'),
                notes: req.body.fileNote,
                folderId: req.body.folderId,
                notesBy: req.userData.userName
            })
            .then(fileNote => res.status(201).send({
                success: true,
                data: fileNote,
                message: 'File note added'
            }))
            .catch(error => res.status(400).send(error))
    }


}