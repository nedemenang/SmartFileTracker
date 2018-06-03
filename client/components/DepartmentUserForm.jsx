import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import SideNav from './Sidenav.jsx';
import { addAdminDepartment, addAdminUser } from '../actions/index.js';
import { validateDepartmentInput, validateUserInput } from '../validation/validation.js';
import DepartmentList from '../components/DepartmentList.jsx';
import toastr from 'toastr';

class DepartmentUserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departmentName: '',
            firstName : '',
            lastName: '',
            userName : '',
            department: '',
            role: '', 
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmitDepartment = this.onSubmitDepartment.bind(this);
        this.onSubmitUser = this.onSubmitUser.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmitDepartment(e) {
        e.preventDefault();
        this.setState({ errors: {} });
        if (this.isValidDepartment()) {
            this.props.addAdminDepartment(this.state).then((response) => {
              if (response) {
                toastr.success(`${this.props.message.success}`);
              } else {
                toastr.warning(`${this.props.message.error}`);
              }
            });
          }
    }

    onSubmitUser(e) {
        e.preventDefault();
        this.setState({ errors: {} });
        if (this.isValidUser()) {
            this.props.addAdminUser(this.state).then((response) => {
              if (response) {
                toastr.success(`${this.props.message.success}`);
              } else {
                toastr.warning(`${this.props.message.error}`);
              }
            });
          }
    }

    isValidDepartment() {
        const { errors, isValid } = validateDepartmentInput(this.state);
        if (!isValid) {
          this.setState({ errors : errors });
        }
        return isValid;
      }

      isValidUser() {
        const { errors, isValid } = validateUserInput(this.state);
        if (!isValid) {
          this.setState({ errors : errors });
        }
        return isValid;
      }

    render(){
        const { errors } = this.state;
        const departments = this.props.departments.map((dept, i) =>
        <option key={dept.name} value={dept.name}>{dept.name}</option>
      );
        return (
            <div>
              <NavBar/>
              <div className="container-fluid">
            <div className="row content">
              <SideNav/>
              <div className="jumbotron col-sm-10">
                    <div className="col-sm-8">
                    <h2>Department</h2>
            <form onSubmit={this.onSubmitDepartment}>
                <div className="form-group">
                    <label for="departmentName">Department Name</label>
                    <input type="text" 
                    className="form-control" 
                    id="departmentName" 
                    onChange={this.onChange}
                    name="departmentName" 
                    placeholder="Enter Department Name"/>
                    {errors.departmentName && (
                        <span style={{ color: 'red' }}>{errors.departmentName}</span>
                    )}
                </div>
                <div className="form-group" style={{'textAlign': 'right'}}>
                    <button type="submit" class="btn btn-primary" >Submit</button>
                </div>
            </form>
                <hr/>
                <h2>User</h2>
                <div>
                <form onSubmit={this.onSubmitUser}>
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
                    </div>                    
            </div>
            </div>
            </div>
               </div>
          </div>      
        );
    }
}

DepartmentUserForm.propTypes = {
    addAdminDepartment: PropTypes.func.isRequired,
    addAdminUser: PropTypes.func.isRequired,
    message: PropTypes.shape({
        success: PropTypes.string.isRequired,
        error: PropTypes.string.isRequired,
    }),
    auth: PropTypes.shape({
        currentUser: PropTypes.object.isRequired
    })
};
    
const mapStateToProps = state => ({
    departments: state.departmentReducer.departments,
    message: state.messageHandlingReducer,
    auth: state.authenticationReducer
});
  
export default connect(mapStateToProps, { addAdminDepartment, addAdminUser })(DepartmentUserForm);

