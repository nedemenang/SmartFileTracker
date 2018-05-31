import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { recieveDepartments, addFileMovement } from '../actions/index.js';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FileNoteForm from './FileNoteForm.jsx';
import swal from 'sweetalert2';
import toastr from 'toastr';
import FileMovementList from '../components/FileMovementList.jsx';
import { validateFileMovementInput } from '../validation/validation.js';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import SideNavFileDashboard from '../components/SidenavFileDashboard.jsx';
import map from 'lodash/map';

class FileMovementForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          movedToDepartment: '',
          movedFromDepartment: this.props.auth.currentUser.department,
          folderId : this.props.file.selectedFile.id,
          modal: false,
          errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }

      componentWillMount() {
          this.props.recieveDepartments();
      }

      onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
      e.preventDefault();

      document.getElementById("submitBtn").disabled = true;

      this.setState({ errors: {} });
      if (this.isValid()) {
        swal({
          title: 'Confirmation',
          text: "Are you sure you want to move this document?",
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
            
            this.props.addFileMovement(this.state).then((response) => {
              if (response) {
                toastr.success(`${this.props.message.success}`);
                this.context.router.history.push('/file-list');
              } else {
                toastr.warning(`${this.props.message.error}`);
              }
            });
          } else if (result.dismiss === swal.DismissReason.cancel) {
            swal(
              'File Movement Cancelled',
            )
            document.getElementById("submitBtn").disabled = false;
          }
      });
    }
  }

  isValid() {
    const { errors, isValid } = validateFileMovementInput(this.state);
    if (!isValid) {
      this.setState({ errors : errors });
    }
    document.getElementById("submitBtn").disabled = false;
    return isValid;
  }

    render(){

      const departments = this.props.department.departments.map((dept, i) =>
        <option key={dept.name} value={dept.name}>{dept.name}</option>
      );
      const { errors } = this.state;
        return (
          
          <div>
          <NavBar/>
          <div className="container-fluid">
        <div className="row content">
          <SideNavFileDashboard/>
          <div className="jumbotron col-sm-10">
                <div className="col-sm-10">
        <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label for="movedToDepartment">Move To</label>
                    <select onChange={this.onChange} 
                    className="form-control"
                    value={this.state.movedToDepartment} 
                    id="movedToDepartment"
                    name="movedToDepartment">
                        <option value="" disabled>Choose Department...</option>
                    {departments}
                    </select>
                    {errors.movedToDepartment && (
                        <span style={{ color: 'red' }}>{errors.movedToDepartment}</span>
                    )}
                </div>
                <div className="form-group" style={{'textAlign': 'right'}}>
            <Button type="submit" id="submitBtn" color="primary" onClick={this.onSubmit} className="btn btn-primary" >Move</Button>&nbsp;
         </div>
         </form>
                    <div>
                        <FileMovementList selectedFile={this.props.file.selectedFile}/>
                        </div>
            </div>
            </div>
            </div>
               </div>
              <Footer/>
          </div>      
        );
    }
}

FileMovementForm.propTypes = {
  recieveDepartments: PropTypes.func.isRequired,
  addFileMovement: PropTypes.func.isRequired,
  message: PropTypes.shape({
      success: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
  }),
  auth: PropTypes.shape({
      currentUser: PropTypes.object.isRequired
  })
};

  FileMovementForm.contextTypes = {
    router: PropTypes.object.isRequired,
};

  const mapStateToProps = state => ({
    file: state.fileManagementReducer,
    selectedFile: state.fileManagementReducer.selectedFile,
    message: state.messageHandlingReducer,
    department: state.departmentReducer,
    auth: state.authenticationReducer
});

export default connect(mapStateToProps, { recieveDepartments, addFileMovement })(FileMovementForm);
