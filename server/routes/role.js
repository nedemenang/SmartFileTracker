import Validator from '../utilities/Validator';
import RoleController from '../controllers/role';
import adminAuth from '../middleware/authenticateAdmin';

export default function (app) {
    // add a new user
    app.post('/role', adminAuth, RoleController.create);

    // get roles
    app.get('/role', RoleController.list);

    // get single role
    app.get('/role/:roleId', RoleController.retrieve);

    //update role
    app.put('/role', adminAuth, RoleController.update);
}