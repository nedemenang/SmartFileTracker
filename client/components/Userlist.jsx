import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginForm from './LoginForm.jsx';
import RegisterUserForm from '../components/RegisterUserForm.jsx';
import {recieveUserList} from '../actions/index.js';
import NavBar from '../components/NavBar.jsx';
import UserItem from '../components/UserItem.jsx';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import ReactTable from "react-table";
import 'react-table/react-table.css';

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
          count: 0,
          pageCount: 0,
          offset: 0,
        }

        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.pageClick = this.pageClick.bind(this);
    }

    pageClick(selectedPage) {
      console.log('click next page...')
      const selected = selectedPage.selected;
      const limit = 2;
      const offset = Math.ceil(selected * limit);
      this.setState({
        offset
      });
      this.props.recieveUserList(selected);
    }

    prevPage(event) {
      event.preventDefault();
      if (this.state.offset > 0) {
        this.props.recieveUserList(this.state.offset - 1);
        const num = this.state.offset;
        this.setState({
          offset: num - 1
        });
      }
    }

    nextPage(event) {
      event.preventDefault();
      const { user } = this.state;
      this.props.recieveUserList(this.state.offset + 1);
      const num = this.state.offset;
      this.setState({
        offset: num + 1
      });
    }
    
    componentWillMount() {
      if(this.props.currentUser) {
        this.props.recieveUserList(this.state.offset);
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
              <tfoot>
                <th>
                  <td colspan="8">
                  <ReactPaginate
                          breakClassName="page-item"
                          breakLabel={<a className="page-link">...</a>}
                          pageClassName="page-item"
                          previousClassName="page-item"
                          nextClassName="page-item"
                          pageLinkClassName="page-link"
                          previousLinkClassName="page-link"
                          nextLinkClassName="page-link"
                          previousLabel={'previous'}
                          nextLabel={'next'}
                          pageCount={this.state.count}
                          marginPagesDisplayed={1}
                          pageRangeDisplayed={3}
                          onPageChange={this.pageClick}
                          containerClassName={'pagination'}
                          subContainerClassName={'pages pagination'}
                          activeClassName={'active'}
                        />
                  </td>
                </th>
                </tfoot>
              <tbody>
              {
                  this.props.users.userList.rows.map((userItem, i) => (
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