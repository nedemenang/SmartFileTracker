import React, {Component} from 'react';
import { connect } from 'react-redux';
import { deactivateUser } from '../actions/index.js';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import swal from 'sweetalert2';

class UserItem extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        swal({
            title: 'Confirmation',
            text: "Are you sure you want to deactivate this user?",
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
                const { userItem } = this.props;
                this.props.deactivateUser(userItem).then((response) => {
                    if (response) {
                    toastr.success(`${this.props.message.success}`);
                    } else {
                    toastr.warning(`${this.props.message.error}`);
                    }
                });
            } else if (result.dismiss === swal.DismissReason.cancel) {
              swal(
                'User Deactivation Cancelled!',
              )
            }
        });
    }

    render(){
        const { userItem } = this.props;
        return (
            <tr>
                  <td>{userItem.id}</td>
                  <td>{userItem.FirstName}</td>
                  <td>{userItem.LastName}</td>
                  <td>{userItem.UserName}</td>
                  <td>{userItem.departmentId}</td>
                  <td>{userItem.role}</td>
                  <td>{userItem.isActive.toString()}</td>
                  <td><a className="btn btn-primary" onClick={this.onClick}>Deactivate</a></td>
                </tr>
        );
    }
}

UserItem.propTypes = {
    deactivateUser: PropTypes.func.isRequired,
    message: PropTypes.shape({
        success: PropTypes.string.isRequired,
        error: PropTypes.string.isRequired,
    }),
  };

  
const mapStateToProps = state => ({
    user: state.userReducer,
    message: state.messageHandlingReducer,
});

export default connect(mapStateToProps, {deactivateUser})(UserItem);
