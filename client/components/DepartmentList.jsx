import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from './LoginForm.jsx';
import RegisterUserForm from '../components/RegisterUserForm.jsx';
import {recieveDepartments} from '../actions/index.js';
import NavBar from '../components/NavBar.jsx';
import DepartmentItem from '../components/DepartmentItem.jsx';

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
        return (
            <div>
                <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Department Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {
                  this.props.departments.map((departmentItem, i) => (
                    <DepartmentItem departmentItem={departmentItem} key={i}/>
                ))
                }
              </tbody>
            </table>
          </div>        
        );
    }
}

DepartmentList.propTypes = {
  recieveDepartments: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
      currentUser: state.authenticationReducer.currentUser,
      departments: state.departmentReducer.departments
});

export default connect(mapStateToProps, {recieveDepartments})(DepartmentList);