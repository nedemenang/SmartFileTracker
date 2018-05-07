import Validator from '../utilities/Validator';
import RoleController from '../controllers/role';

export default function (app) {
    // add a new user
    app.post('/role', RoleController.create);

    // get roles
    app.get('/role', RoleController.list);

    // get single role
    app.get('/role/:roleId', RoleController.retrieve);

    //update role
    app.put('/role', RoleController.update);
}