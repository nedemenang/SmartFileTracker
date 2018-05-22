import React, {Component} from 'react';
import LoginForm from './LoginForm.jsx';
import RegisterUserForm from '../components/RegisterUserForm.jsx';
import NavBar from '../components/NavBar.jsx';
import FileForm from '../components/FileForm.jsx';
import FileList from '../components/FileList.jsx';
import UserList from '../components/Userlist.jsx';
import FileMovement from '../components/FileMovementForm.jsx';

class Dashboard2 extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <NavBar/>
            <div className="container-fluid">
            <div className="row content">
              <div className="col-sm-2 sidenav1">
                <ul className="nav nav-pills flex-column">
                  <li className="nav-item"><a className="nav-link" href="#section1">Departments</a></li>
                </ul><br/>
              </div>
              <div className="col-sm-10">
                <h1>ADMIN Dashboard</h1>
                <hr/>
                <h2></h2>
          <div className="table-responsive">
          <FileList/>
          </div>
              </div>
            </div>
          </div>
          </div>        
        );
    }
}

export default Dashboard2;
