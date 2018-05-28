import React, {Component} from 'react';
import { connect } from 'react-redux';
import { updateDepartment } from '../actions/index.js';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import toastr from 'toastr';

class DepartmentItem extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }
ß
    onClick(e) {
        e.preventDefault();
        swal({
            title: 'Confirmation',
            text: "Are you sure you want to deactivate this depatment?",
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
                const { departmentItem } = this.props;
                this.props.updateDepartment(departmentItem)
                .then((response) => {
                    if (response) {
                      toastr.success(`${this.props.message.success}`);
                    } else {
                      toastr.warning(`${this.props.message.error}`);
                    }
                  });
            } else if (result.dismiss === swal.DismissReason.cancel) {
              swal(
                'Department Deactivation Cancelled',
              )
            }
        });
    }

    render(){
        const { departmentItem } = this.props;
        return (
            <tr>
                  <td>{departmentItem.id}</td>
                  <td>{departmentItem.name}</td>
                  <td><a className="btn btn-primary" onClick={this.onClick}>Deactivate</a></td>
                </tr>
        );
    }
}

DepartmentItem.propTypes = {
    updateDepartment: PropTypes.func.isRequired,
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
    message: state.messageHandlingReducer
});

export default connect(mapStateToProps, {updateDepartment})(DepartmentItem);
