import React, {Component} from 'react';
import '../vendors/bootstrap.min.css';
import '../vendors/css/customCss.css';
import '../vendors/js/jquery-3.3.1.min.js';
import store from '../store/store.js';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import jwt from 'jsonwebtoken';

import { setCurrentUser } from '../actions/index.js';
import rootReducer from '../reducers/rootReducer.js';
import setAuthorizationToken from '../utils/setAuthorizationToken.js';
import isAuthenticated from '../utils/isAuthenticated.js';

import AuthContainer from '../components/AuthContainer.jsx';
import LoginPage from '../components/LoginPage.jsx';
import NavBar from '../components/NavBar.jsx';
import RegisterUserForm from '../components/RegisterUserForm.jsx';
import FileForm from '../components/FileForm.jsx';
import FileNoteForm from '../components/FileNoteForm.jsx';
import FileMovementForm from '../components/FileMovementForm.jsx';
import FileView from '../components/Fileviewer.jsx';
import Dashboard from '../components/Dashboard.jsx';
import Dashboard2 from '../components/Dashboard2.jsx';
import FileList from '../components/FileList.jsx';
import UserForm from '../components/UserForm.jsx';
import DepartmentForm from '../components/DepartmentForm.jsx';

if (localStorage.jwtToken) {
    // Adding the function setAuthorizationToken() call to index file
    setAuthorizationToken(localStorage.jwtToken);
    //console.log(jwt.decode(localStorage.jwtToken));
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
  }

export default class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={isAuthenticated(LoginPage)} />
                    <Route
                    path="/auth/:login?"
                    component={isAuthenticated(LoginPage)}
                    />
                    {/* <Route exact path="/resetPassword" component={ResetPassword} /> */}
                    <AuthContainer exact path="/file-list" Comp={FileList} />
                    <AuthContainer exact path="/new-file" Comp={FileForm} />
                    <AuthContainer exact path="/file-view" Comp={FileView} />
                    <AuthContainer exact path="/new-user" Comp={UserForm} />
                    <AuthContainer exact path="/new-department" Comp={DepartmentForm} />
                    <AuthContainer exact path="/file-movements" Comp={FileMovementForm} />
                    <AuthContainer exact path="/file-notes" Comp={FileNoteForm} />
                </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}