import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from './LoginForm.jsx';
import RegisterUserForm from '../components/RegisterUserForm.jsx';
import {recieveDepartments, updateDepartment} from '../actions/index.js';
import NavBar from '../components/NavBar.jsx';
import DepartmentItem from '../components/DepartmentItem.jsx';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import swal from 'sweetalert2';
import toastr from 'toastr';

class DepartmentList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
      if(this.props.currentUser) {
        this.props.recieveDepartments();
      }
    }

    render(){
      const columns = [{
        Header: 'ID',
        accessor: 'id' 
      }, {
        Header: 'Department Name',
        accessor: 'name' 
      }, {
        header: '',
        id: 'click-me-button',
        Cell: props => (<button className="btn btn-success">Deactivate</button>)
      }]

        return (
            <div>
              <h1>Department List</h1>
                <hr/>
                <ReactTable
                  data={this.props.departments}
                  columns={columns}
                  defaultPageSize={6}
                  getTdProps={(state, rowInfo, column, instance) => {
                    return {
                      onClick: (e, handleOriginal) => {
                        swal({
                          title: 'Confirmation',
                          text: "Are you sure you want to deactivate this department?",
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
                              this.props.updateDepartment(rowInfo.original)
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
                        if (handleOriginal) {
                          handleOriginal();
                        }
                      }
                    };
                  }}
                />
          </div>        
        );
    }
}

DepartmentList.propTypes = {
  recieveDepartments: PropTypes.func.isRequired,
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
      currentUser: state.authenticationReducer.currentUser,
      departments: state.departmentReducer.departments,
      message: state.messageHandlingReducer
});

export default connect(mapStateToProps, {recieveDepartments, updateDepartment})(DepartmentList);