import Validator from '../utilities/Validator';
import DepartmentController from '../controllers/department'

export default function (app) {
    // add a new department
    app.post('/department', DepartmentController.create);
    
    // get all departments
    app.get('/department', DepartmentController.list);

    // get single department
    app.get('/department/:departmentId', DepartmentController.retrieve);

    // get single department
    app.put('/department/', DepartmentController.update);
}