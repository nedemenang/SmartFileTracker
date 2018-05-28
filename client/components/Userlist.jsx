import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginForm from './LoginForm.jsx';
import RegisterUserForm from '../components/RegisterUserForm.jsx';
import {recieveUserList} from '../actions/index.js';
import NavBar from '../components/NavBar.jsx';
import UserItem from '../components/UserItem.jsx';
import PropTypes from 'prop-types';

class UserList extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
      if(this.props.currentUser) {
        this.props.recieveUserList();
      }
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
                  <th>Is Active?</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {
                  this.props.users.map((userItem, i) => (
                    <UserItem userItem={userItem} key={i}/>
                ))
                }
              </tbody>
            </table>
          </div>        
        );
    }
}

UserList.propTypes = {
  recieveUserList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
      currentUser: state.authenticationReducer.currentUser,
      users: state.userReducer.users
});

export default connect(mapStateToProps, {recieveUserList})(UserList);