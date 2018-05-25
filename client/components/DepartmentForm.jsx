import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import SideNav from './Sidenav.jsx';
import { addDepartment } from '../actions/index.js';
import { validateDepartmentInput } from '../validation/validation.js';
import DepartmentList from '../components/DepartmentList.jsx';
import toastr from 'toastr';

class DepartmentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departmentName: '',
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
            this.props.addDepartment(this.state).then((response) => {
              if (response) {
                toastr.success(`${this.props.message.success}`);
              } else {
                toastr.warning(`${this.props.message.error}`);
              }
            });
          }
    }

    isValid() {
        const { errors, isValid } = validateDepartmentInput(this.state);
        if (!isValid) {
          this.setState({ errors : errors });
        }
        return isValid;
      }

    render(){
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
                    <div>
                        <DepartmentList/>
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

DepartmentForm.propTypes = {
    addDepartment: PropTypes.func.isRequired,
    message: PropTypes.shape({
        success: PropTypes.string.isRequired,
        error: PropTypes.string.isRequired,
    }),
    auth: PropTypes.shape({
        currentUser: PropTypes.object.isRequired
    })
};
    
const mapStateToProps = state => ({
    department: state.departmentReducer,
    message: state.messageHandlingReducer,
    auth: state.authenticationReducer
});
  
export default connect(mapStateToProps, { addDepartment })(DepartmentForm);

