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
 
class FileViewer extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
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

const mapStateToProps = state => ({
  selectedFile: state.fileManagementReducer.selectedFile,
  department: state.departmentReducer.department
});

export default connect(mapStateToProps, {})(FileViewer);