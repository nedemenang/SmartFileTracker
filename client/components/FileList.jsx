import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recieveFilesByDepartment, recieveFiles } from '../actions/index.js';
import FileItem from './FileItem.jsx';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import SideNav from './Sidenav.jsx';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { selectFile } from '../actions/index.js';

class FileList extends Component {

    constructor(props) {
        super(props);

        this.state = {
          searchParameter: ''
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
      this.setState({[e.target.name]: e.target.value});
  }

    componentWillMount() {
      if(this.props.currentUser) {
        const department = {
          departmentId: this.props.currentUser.department
        }
        if (this.props.currentUser.role === 'admin') {
          this.props.recieveFiles();
        } else {
          this.props.recieveFilesByDepartment(department);
        }
        
      }
    }

    render(){
      const columns = [{
        Header: 'File No',
        accessor: 'FileNo' 
      }, {
        Header: 'File Name',
        accessor: 'Name' 
      }, {
        Header: 'File Description',
        accessor: 'FileDescription' 
      }, {
        header: '',
        id: 'click-me-button',
        Cell: props => (<button className="btn btn-success">View</button>)
      }]
        return (
            <div>
              <NavBar/>
              <div className="container-fluid">
            <div className="row content">
              <SideNav/>
              
              <div className="col-sm-10">
              <div className="row">
              <div className="col-sm-6">
                <h1>File List</h1>
                </div>
                <div className="col-sm-6">
               <input type="text" 
                    value={this.state.searchParameter}
                    onChange={this.onChange}
                    className="form-control" 
                    name="searchParameter"
                    id="searchParameter" 
                    placeholder="Search"/>
               </div>
               </div>
               <hr/>
                <ReactTable
                  data={this.props.files}
                  columns={columns}
                  defaultPageSize={6}
                  getTdProps={(state, rowInfo, column, instance) => {
                    return {
                      onClick: (e, handleOriginal) => {
                        this.props.selectFile(rowInfo.original)
                        this.context.router.history.push('/file-view');
                        // rowInfo.original
                        if (handleOriginal) {
                          handleOriginal();
                        }
                      }
                    };
                  }}
                />
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
  selectFile: PropTypes.func.isRequired,
  recieveFiles: PropTypes.func.isRequired
};

FileList.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
      currentUser: state.authenticationReducer.currentUser,
      files: state.fileManagementReducer.files
      
});

export default connect(mapStateToProps, {recieveFilesByDepartment, selectFile, recieveFiles})(FileList);
