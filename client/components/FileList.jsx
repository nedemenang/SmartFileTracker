import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recieveFilesByDepartment } from '../actions/index.js';
import FileItem from './FileItem.jsx';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import SideNav from './Sidenav.jsx';


class FileList extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
      if(this.props.currentUser) {
        const department = {
          departmentId: this.props.currentUser.department
        }
        this.props.recieveFilesByDepartment(department);
      }
    }

    render(){
        return (
            <div>
              <NavBar/>
              <div className="container-fluid">
            <div className="row content">
              <SideNav/>
              
              <div className="col-sm-10">
                <h1>Dashboard</h1>
                <hr/>
              <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>FILE NUMBER</th>
                  <th>FILE DESCRIPTION</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {
                  this.props.files.map((fileItem, i) => (
                    <FileItem fileItem={fileItem} key={i}/>
                ))
                }
               </tbody>
               </table>
               </div>
               </div>
               </div>
              <Footer/>
          </div>        
        );
    }
}

FileList.propTypes = {
  recieveFilesByDepartment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
      currentUser: state.authenticationReducer.currentUser,
      files: state.fileManagementReducer.files
      
});

export default connect(mapStateToProps, {recieveFilesByDepartment})(FileList);
