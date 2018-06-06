import React, { Component } from 'react';
import PDFReader from "react-pdf-reader";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import FileMovementForm from './FileMovementForm.jsx';
import FileNoteForm from './FileNoteForm.jsx';
import SideNavFileDashboard from '../components/SidenavFileDashboard.jsx';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import SideNav from './Sidenav.jsx';
import swal from 'sweetalert2';
import toastr from 'toastr';
import {updateFile} from '../actions/index.js';
 
class FileViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numPages: null,
      pageNumber: 1,
      userRole: this.props.currentUser.role
    }
    this.onClick = this.onClick.bind(this);
}

onClick(e) {
  e.preventDefault();
    swal({
      title: 'Confirmation',
      text: "Are you sure you want to deactivate this file?",
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
          this.props.updateFile(this.props.selectedFile)
          .then((response) => {
              if (response) {
                toastr.success(`${this.props.message.success}`);
                this.context.router.history.push('/file-list');
              } else {
                toastr.warning(`${this.props.message.error}`);
              }
            });
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal(
          'File Deactivation Cancelled',
        )
      }
  });
}

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }
 
  render() {
    const { pageNumber, numPages } = this.state;
    var pageArrays = [];
    for(var i=1; i<=numPages; i++) {
      pageArrays.push(i);
    }
    const { selectedFile } = this.props;
    return (
      <div>
      <NavBar/>
              <div className="container-fluid">
            <div className="row content">
              <SideNavFileDashboard/>
            <div className="col-sm-10">
            { this.state.userRole === "admin" &&
            <div>
            <hr/>
            <div><button type="submit" id="submitBtn" color="primary" onClick={this.onClick} className="btn btn-primary" >Deactivate</button> </div>
              <hr/>
              </div>
            }
                    <div className="jumbotron col-sm-8">
       <Document file={'/' + selectedFile.FileLink} onLoadSuccess={this.onDocumentLoad}
        >
        {
              pageArrays.map((pageNumber) => (
                <Page pageNumber={pageNumber}/>
            ))
        }
        </Document>
        </div>
      </div>
      </div>
      </div>
            </div>
    );
  }
}

FileViewer.propTypes = {
  updateFile: PropTypes.func.isRequired,
  message: PropTypes.shape({
      success: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
  }),
  auth: PropTypes.shape({
      currentUser: PropTypes.object.isRequired
  })
};

FileViewer.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  currentUser: state.authenticationReducer.user,
  selectedFile: state.fileManagementReducer.selectedFile,
  department: state.departmentReducer.department,
  message: state.messageHandlingReducer
});

export default connect(mapStateToProps, {updateFile})(FileViewer);