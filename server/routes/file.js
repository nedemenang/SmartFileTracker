import Validator from '../utilities/Validator';
import FileController from '../controllers/file';

export default function (app) {
    // add a new file
    app.post('/file', FileController.createFile);

    // add new file note
    app.post('/file/fileNote', FileController.CreateFileNote);

    // add new file movement
    app.post('/fileMovement', FileController.CreateFileMovement);

    // get file movement for file
    app.get('/fileMovement/:fileId', FileController.retrieveById);

    // get notes for file
    app.get('/fileNotes/:fileId', FileController.retrieveById);

    // get files for department
    app.get('/file/:departmentId', FileController.listByDepartment);

    // get single file
    app.get('/file/:fileId', FileController.retrieveById);
}