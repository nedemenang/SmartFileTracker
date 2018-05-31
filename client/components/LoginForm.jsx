import React, {Component} from 'react';
import { connect } from 'react-redux';
import jquery from 'jquery';
import image from './logo.jpeg';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { loginAUser } from '../actions/index.js';
import { validateLoginInput } from '../validation/validation.js';
import toastr from 'toastr';


class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            userPassword: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        e.preventDefault
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ errors: {} });
        if (this.isValid()) {
            this.props.loginAUser(this.state).then((response) => {
              if (response) {
                this.context.router.history.push('/file-list');
                toastr.success(`${this.props.message.success}`);
              } else {
                toastr.warning(`${this.props.message.error}`);
              }
            });
          }
    }

    isValid() {
        const { errors, isValid } = validateLoginInput(this.state);
        if (!isValid) {
          this.setState({ errors : errors });
        }
        return isValid;
      }

    render(){
        const { errors } = this.state;
        return (
    <section className="login-block">
            <div className="container">
            <div className="row">
                <div className="col-md-6 login-sec">
                    <h2 className="text-center"></h2>
		    <form className="login-form" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label for="username" className="text-uppercase">Username</label>
                    <input type="text" 
                    classNameName="form-control"
                    value={this.state.userName}
                    onChange={this.onChange}
                    name="userName" 
                    placeholder="Username here"/>
                    {errors.userName && (
                        <span style={{ color: 'red' }}>{errors.userName}</span>
                    )}
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1" className="text-uppercase">Password</label>
                    <input type="password" 
                    className="form-control" 
                    value={this.state.userPassword}
                    onChange={this.onChange}
                    name="userPassword"
                    placeholder="Password here"/>
                    {errors.userPassword && (
                        <span style={{ color: 'red' }}>{errors.userPassword}</span>
                    )}
                </div>
                    <div className="form-check">
                    <button type="submit" className="btn btn-login float-right">Submit</button>
                </div>
            </form>
		</div>
		<div className="col-md-6 banner-sec">
        <div className="carousel-item active">
        <img className="d-block img-fluid" src={image} alt="First slide"/>
        </div>
        </div>
    </div>
    </div>
</section>
        );
    }
}

LoginForm.propTypes = {
    loginAUser: PropTypes.func.isRequired,
    message: PropTypes.shape({
        success: PropTypes.string.isRequired,
        error: PropTypes.string.isRequired,
    }),
};
  
LoginForm.contextTypes = {
    router: PropTypes.object.isRequired,
};
  
const mapStateToProps = state => ({
    auth: state.authenticationReducer,
    message: state.messageHandlingReducer
});
  
export default connect(mapStateToProps, { loginAUser })(LoginForm);
