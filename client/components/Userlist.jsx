import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginForm from './LoginForm.jsx';
import RegisterUserForm from '../components/RegisterUserForm.jsx';
import {recieveUserList, deactivateUser} from '../actions/index.js';
import NavBar from '../components/NavBar.jsx';
import UserItem from '../components/UserItem.jsx';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import toastr from 'toastr';
import swal from 'sweetalert2';

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
          count: 0,
          pageCount: 0,
          offset: 0,
        }
    }

    componentWillMount() {
      if(this.props.currentUser) {
        this.props.recieveUserList();
      }
    }

    render(){
      const columns = [{
        Header: 'First Name',
        accessor: 'FirstName' 
      }, {
        Header: 'Last Name',
        accessor: 'LastName' 
      }, {
        Header: 'User Name',
        accessor: 'UserName' 
      }, {
        Header: 'Department',
        accessor: 'departmentId' 
      }, {
        Header: 'Role',
        accessor: 'role' 
      }, {
        Header: 'Is Active?',
        accessor: 'isActive',
        Cell: props => <span className='bool'>{props.value.toString()}</span> 
      },
      {
        header: '',
        id: 'click-me-button',
        Cell: props => (<button className="btn btn-success">Deactivate</button>)
      }]

        return (
            <div>
              <ReactTable
                  data={this.props.users.userList.rows}
                  columns={columns}
                  defaultPageSize={5}
                  getTdProps={(state, rowInfo, column, instance) => {
                    return {
                      onClick: (e, handleOriginal) => {
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
                              this.props.deactivateUser(rowInfo.original).then((response) => {
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

UserList.propTypes = {
    recieveUserList: PropTypes.func.isRequired,
    deactivateUser: PropTypes.func.isRequired,
    message: PropTypes.shape({
      success: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
  })
};

const mapStateToProps = state => ({
      currentUser: state.authenticationReducer.currentUser,
      users: state.userReducer.users,
      message: state.messageHandlingReducer
});

export default connect(mapStateToProps, {recieveUserList, deactivateUser})(UserList);