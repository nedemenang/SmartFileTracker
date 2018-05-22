import React, {Component} from 'react';
import LoginForm from './LoginForm.jsx';
import RegisterUserForm from '../components/RegisterUserForm.jsx';

class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <LoginForm/>
        );
    }
}

export default LoginPage;
