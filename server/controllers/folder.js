import {Folder} from "../models";
import {FileMovement} from "../models";
import {FileNote} from "../models";

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
                        CreateOn : req.body.createdOn,
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
                }}, {
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

    listByDepartment(req, res) {
        return Folder
            .all({
                where: {
                    isActive: true,
                    CurrentDepartment: req.params.departmentId
                }}, {
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

    update(req, res) {
        return Folder
            .findById(req.body.folderId)
            .then(folder => {
                if (!folder) {
                    return res.status(404).send({
                        message: 'Folder not found'
                    });
                }
                return folder
                    .update({
                        FileNo : req.body.fileNo || folder.fileNo,
                        FileHash : req.body.fileHash || folder.fileHash,
                        CurrentDepartment : req.body.currentDepartment || folder.currentDepartment,
                        FileDescription : req.body.fileDescription || folder.fileDescription,
                        FileLink : req.body.fileLink || folder.fileLink
                    })
                    .then((department) => res.status(200).send(folder))
                    .catch((error) => res.status(400).send(error));
            })
    },

    CreateFileMovement(req, res) {
        return FileMovement
            .create({
                DateMoved: req.body.dateMoved,
                movedFromDepartmentId: req.body.movedFromDepartmentId,
                movedToDepartmentId: req.body.movedToDepartmentId,
                movedBy: req.userData.userName,
                movedTo: req.body.movedTo,
                folderId: req.body.fileId
            })
            .then(fileMovement => res.status(201).send({
                success: true,
                data: fileMovement,
                message: 'File successfully moved'
            }))
            .catch(error => res.status(400).send(error));
    },

    CreateFileNote(req, res) {
        return FileNote
            .create({
                DateCreated: req.body.dateCreated,
                notes: req.body.notes,
                folderId: req.body.fileId,
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