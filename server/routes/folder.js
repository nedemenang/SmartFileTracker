import multer from 'multer';
import Validator from '../utilities/Validator';
import FileController from '../controllers/folder';
import auth from '../middleware/authenticate';
import adminAuth from '../middleware/authenticate';

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './dist/server/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('File type can only be pdf'), false);
    }
};



const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 500
    },
    fileFilter: fileFilter
});

export default function (app) {
    // add a new file
    app.post('/file', auth, upload.single('uploadedFile'), FileController.createFile);

    app.put('/file', adminAuth, FileController.update);

    // add new file note
    app.post('/fileNote', auth, FileController.CreateFileNote);

    // add new file movement
    app.post('/fileMovement', auth, FileController.CreateFileMovement);

    // get file movement for file
    app.get('/files', FileController.list);

    // get file movement for file
    app.get('/fileMovements/:fileId', FileController.listFileMovementsForFile);

    // get notes for file
    app.get('/fileNotes/:fileId', FileController.listFileNotesForFile);

    // get files for department
    app.get('/filesByDepartment/:departmentId', FileController.listByDepartment);

    // get single file
    app.get('/file/:fileId', FileController.retrieveById);

    app.get('/fileByNo/:fileNo', FileController.retrieveByNo);
}