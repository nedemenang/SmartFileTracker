import React, {Component} from 'react';
import { connect } from 'react-redux';
import { selectUser } from '../actions/index.js';
import PropTypes from 'prop-types';

class UserItem extends Component {
    constructor(props) {
        super(props);
    }

    onClick(e) {
        e.preventDefault();
        const { userItem } = this.props;
        this.props.selectUser(userItem)
        this.context.router.history.push('/user-view');
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
                  <td><a className="btn btn-primary" onClick={this.onClick}>View</a></td>
                </tr>
        );
    }
}

  
const mapStateToProps = state => ({
    user: state.userReducer
});

export default connect(mapStateToProps, {})(UserItem);
