'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (app) {
    // add a new file
    app.post('/file', _authenticate2.default, upload.single('uploadedFile'), _folder2.default.createFile);

    app.put('/file', _authenticate2.default, _folder2.default.update);

    // add new file note
    app.post('/fileNote', _authenticate2.default, _folder2.default.CreateFileNote);

    // add new file movement
    app.post('/fileMovement', _authenticate2.default, _folder2.default.CreateFileMovement);

    // get file movement for file
    app.get('/files', _folder2.default.list);

    // get file movement for file
    app.get('/fileMovements/:fileId', _folder2.default.listFileMovementsForFile);

    // get notes for file
    app.get('/fileNotes/:fileId', _folder2.default.listFileNotesForFile);

    // get files for department
    app.get('/filesByDepartment/:departmentId', _folder2.default.listByDepartment);

    // get single file
    app.get('/file/:fileId', _folder2.default.retrieveById);

    app.get('/fileByNo/:fileNo', _folder2.default.retrieveByNo);
};

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _Validator = require('../utilities/Validator');

var _Validator2 = _interopRequireDefault(_Validator);

var _folder = require('../controllers/folder');

var _folder2 = _interopRequireDefault(_folder);

var _authenticate = require('../middleware/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = _multer2.default.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, './dist/server/uploads/');
    },
    filename: function filename(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

var fileFilter = function fileFilter(req, file, cb) {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('File type can only be pdf'), false);
    }
};

var upload = (0, _multer2.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 500
    },
    fileFilter: fileFilter
});