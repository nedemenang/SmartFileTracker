import Validator from '../utilities/Validator';
import DepartmentController from '../controllers/department'
import adminAuth from '../middleware/authenticate';

export default function (app) {
    // add a new department
    app.post('/department', adminAuth, DepartmentController.create);

    app.post('/adminDepartment', DepartmentController.createWithAdmin);

    // get all departments
    app.get('/departments', DepartmentController.list);

    // get single department
    app.get('/department/:departmentId', DepartmentController.retrieve);

    // edit single department
    app.put('/department', DepartmentController.update);
}