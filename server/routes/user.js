import Validator from '../utilities/Validator';
import User from '../controllers/user';
import adminAuth from '../middleware/authenticateAdmin';

export default function (app) {
    // add a new user
    app.post('/signup', adminAuth, User.create);

    app.put('/passwordreset', User.passwordReset);

    app.post('/signin', User.signIn);

    app.post('/signUpInitial', User.create);

    app.get('/users', User.list);

    app.put('/user', adminAuth, User.update);

}