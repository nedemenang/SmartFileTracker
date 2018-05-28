import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import SideNav from './Sidenav.jsx';
import { passwordReset } from '../actions/index.js';
import { validatePasswordResetInput } from '../validation/validation.js';
import toastr from 'toastr';
import swal from 'sweetalert2';

class PasswordReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password : '',
            confirmPassword: '',
            userName : this.props.auth.currentUser.userName,
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
            swal({
              title: 'Confirmation',
              text: "Are you sure you want to reset your password?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
              confirmButtonClass: 'btn btn-success',
              cancelButtonClass: 'btn btn-danger',
              buttonsStyling: false,
              allowOutsideClick: false,
            }).then((result) => {
              if (result.value) {
                
                this.props.passwordReset(this.state).then((response) => {
                    if (response) {
                      toastr.success(`${this.props.message.success}`);
                    } else {
                      toastr.warning(`${this.props.message.error}`);
                    }
                  });
              } else if (result.dismiss === swal.DismissReason.cancel) {
                swal(
                  'Password Reset Cancelled',
                )
                document.getElementById("submitBtn").disabled = false;
              }
          });
        }
    }

    isValid() {
        const { errors, isValid } = validatePasswordResetInput(this.state);
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
                <legend>Password Reset</legend>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" 
                    value={this.state.password}
                    onChange={this.onChange}
                    className="form-control" 
                    name="password"
                    id="password" 
                    placeholder="Password here"/>
                    {errors.password && (
                        <span style={{ color: 'red' }}>{errors.password}</span>
                    )}
                </div>
                <div className="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" 
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                    className="form-control" 
                    name="confirmPassword"
                    id="confirmPassword" 
                    placeholder="Confirm Password"/>
                    {errors.confirmPassword && (
                        <span style={{ color: 'red' }}>{errors.confirmPassword}</span>
                    )}
                </div>
                <div className="form-group" style={{'textAlign': 'right'}}>
                    <button type="submit" class="btn btn-primary" >Reset</button>
                </div>
            </form>
            </div>
            </div>
               </div>
               </div>
              <Footer/>
          </div>      
        );
    }
}


PasswordReset.propTypes = {
    passwordReset: PropTypes.func.isRequired,
    message: PropTypes.shape({
        success: PropTypes.string.isRequired,
        error: PropTypes.string.isRequired,
    }),
    auth: PropTypes.shape({
        currentUser: PropTypes.object.isRequired
    })
};
    
const mapStateToProps = state => ({
    file: state.fileManagementReducer,
    message: state.messageHandlingReducer,
    auth: state.authenticationReducer
});
  
export default connect(mapStateToProps, { passwordReset })(PasswordReset);

