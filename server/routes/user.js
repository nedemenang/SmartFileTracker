import Validator from '../utilities/Validator';
import User from '../controllers/user';
import adminAuth from '../middleware/authenticateAdmin';

export default function (app) {
    // add a new user
    app.post('/signup', adminAuth, User.create);

    app.post('/signin', User.signIn);

    app.post('/signUpInitial', User.create);

    // get users for department
    app.get('/user/:departmentId', (req, res) => {

    });

    // get single user
    app.get('/user/:userId', (req, res) => {

    });
}