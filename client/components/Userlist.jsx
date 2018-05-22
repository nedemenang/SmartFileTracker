import React, {Component} from 'react';
import LoginForm from './LoginForm.jsx';
import RegisterUserForm from '../components/RegisterUserForm.jsx';
import NavBar from '../components/NavBar.jsx';
import FileForm from '../components/FileForm.jsx';

class UserList extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>User Name</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1,001</td>
                  <td>Lorem</td>
                  <td>ipsum</td>
                  <td>ipsum</td>
                  <td>ipsum</td>
                  <td>ipsum</td>
                  <td><a className="btn btn-primary" href="#section1">View</a></td>
                </tr>
                <tr>
                  <td>1,002</td>
                  <td>amet</td>
                  <td>consectetur</td>
                  <td>ipsum</td>
                  <td>ipsum</td>
                  <td>ipsum</td>
                  <td><a className="btn btn-primary" href="#section1">View</a></td>
                </tr>
                <tr>
                  <td>1,003</td>
                  <td>Integer</td>
                  <td>nec</td>
                  <td>ipsum</td>
                  <td>ipsum</td>
                  <td>ipsum</td>
                  <td><a className="btn btn-primary" href="#section1">View</a></td>
                </tr>
              </tbody>
            </table>
          </div>        
        );
    }
}

export default UserList;
