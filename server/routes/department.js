import Validator from '../utilities/Validator';
import DepartmentController from '../controllers/department'
import adminAuth from '../middleware/authenticate';

export default function (app) {
    // add a new department
    app.post('/department', adminAuth, DepartmentController.create);
    
    // get all departments
    app.get('/department', DepartmentController.list);

    // get single department
    app.get('/department/:departmentId', DepartmentController.retrieve);

    // edit single department
    app.put('/department', adminAuth, DepartmentController.update);
}