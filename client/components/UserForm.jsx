import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import SideNav from './Sidenav.jsx';
import { registerUser } from '../actions/index.js';
import { validateUserInput } from '../validation/validation.js';
import toastr from 'toastr';
import UserList from '../components/Userlist.jsx';

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName : '',
            lastName: '',
            userName : '',
            department: '',
            role: '', 
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ errors: {} });
        if (this.isValid()) {
            this.props.registerUser(this.state).then((response) => {
              if (response) {
                toastr.success(`${this.props.message.success}`);
              } else {
                toastr.warning(`${this.props.message.error}`);
              }
            });
          }
    }

    isValid() {
        const { errors, isValid } = validateUserInput(this.state);
        if (!isValid) {
          this.setState({ errors : errors });
        }
        return isValid;
      }

    render(){
        const departments = this.props.departments.map((dept, i) =>
        <option key={dept.name} value={dept.name}>{dept.name}</option>
      );
        const { errors } = this.state;
        return (
            <div>
              <NavBar/>
              <div className="container-fluid">
            <div className="row content">
              <SideNav/>
            <div className="jumbotron col-sm-10">
                    <div className="col-sm-8">
            <form onSubmit={this.onSubmit}>
                <legend>User Registration Form</legend>
                <div className="form-group">
                    <label for="firstName">First Name</label>
                    <input type="text" 
                    value={this.state.firstName}
                    onChange={this.onChange}
                    className="form-control" 
                    name="firstName"
                    id="firstName" 
                    placeholder="First Name here"/>
                    {errors.firstName && (
                        <span style={{ color: 'red' }}>{errors.firstName}</span>
                    )}
                </div>
                <div className="form-group">
                    <label for="lastName">Last Name</label>
                    <input type="text" 
                    value={this.state.lastName}
                    onChange={this.onChange}
                    className="form-control" 
                    name="lastName"
                    id="lastName" 
                    placeholder="Last Name here"/>
                    {errors.lastName && (
                        <span style={{ color: 'red' }}>{errors.lastName}</span>
                    )}
                </div>
                <div className="form-group">
                    <label for="userName">User Name</label>
                    <input type="text" 
                    value={this.state.userName}
                    onChange={this.onChange}
                    className="form-control" 
                    name="userName"
                    id="userName" 
                    placeholder="User Name here"/>
                    {errors.userName && (
                        <span style={{ color: 'red' }}>{errors.userName}</span>
                    )}
                </div>
                <div className="form-group">
                    <label for="department">Department</label>
                    <select onChange={this.onChange} 
                    className="form-control"
                    value={this.state.department} 
                    id="department"
                    name="department">
                        <option value="" disabled>Choose Department...</option>
                    {departments}
                    </select>
                    {errors.department && (
                        <span style={{ color: 'red' }}>{errors.department}</span>
                    )}
                </div>
                <div className="form-group">
                    <label for="role">Role</label>
                    <select onChange={this.onChange} 
                    className="form-control"
                    value={this.state.role} 
                    id="role"
                    name="role">
                        <option value="" disabled>Choose Role...</option>
                        <option value="admin">Administrator</option>
                        <option value="user">User</option>
                    </select>
                    {errors.role && (
                        <span style={{ color: 'red' }}>{errors.role}</span>
                    )}
                </div>
                <div className="form-group" style={{'textAlign': 'right'}}>
                    <button type="submit" class="btn btn-primary" >Submit</button>
                </div>
            </form>
            <div>
                        <UserList/>
                        </div>
            </div>
            </div>
               </div>
               </div>
              <Footer/>
          </div>      
        );
    }
}


UserForm.propTypes = {
    registerUser: PropTypes.func.isRequired,
    message: PropTypes.shape({
        success: PropTypes.string.isRequired,
        error: PropTypes.string.isRequired,
    }),
    auth: PropTypes.shape({
        currentUser: PropTypes.object.isRequired
    })
};
    
const mapStateToProps = state => ({
    user: state.userReducer,
    message: state.messageHandlingReducer,
    auth: state.authenticationReducer, 
    departments: state.departmentReducer.departments
});
  
export default connect(mapStateToProps, { registerUser })(UserForm);

