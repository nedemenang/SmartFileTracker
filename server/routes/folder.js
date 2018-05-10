import multer from 'multer';
import Validator from '../utilities/Validator';
import FileController from '../controllers/folder';
import auth from '../middleware/authenticate';

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './server/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('File type can only be jpeg or pdf'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 100
    },
    fileFilter: fileFilter
});

export default function (app) {
    // add a new file
    app.post('/file', auth, upload.single('fileScanned'), FileController.createFile);

    // add new file note
    app.post('/fileNote', auth, FileController.CreateFileNote);

    // add new file movement
    app.post('/fileMovement', auth, FileController.CreateFileMovement);

    // get file movement for file
    app.get('/fileMovement/:fileId', FileController.retrieveById);

    // get notes for file
    app.get('/fileNotes/:fileId', FileController.retrieveById);

    // get files for department
    app.get('/fileByDepartment/:departmentId', FileController.listByDepartment);

    // get single file
    app.get('/file/:fileId', FileController.retrieveById);
}