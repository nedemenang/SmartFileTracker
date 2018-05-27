import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { addFileNote } from '../actions/index.js';
import FileNoteList from '../components/FileNoteList.jsx';
import SideNavFileDashboard from '../components/SidenavFileDashboard.jsx';
import { validateFileNoteInput } from '../validation/validation.js';
import toastr from 'toastr';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';

class FileNoteForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          fileNote: '',
          folderId: this.props.file.selectedFile.id,
          errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
      }

      onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
      e.preventDefault();
      this.setState({ errors: {} });
      if (this.isValid()) {
          this.props.addFileNote(this.state).then((response) => {
            if (response) {
              toastr.success(`${this.props.message.success}`);
            } else {
              toastr.warning(`${this.props.message.error}`);
            }
          });
        }
    } 

    isValid() {
      const { errors, isValid } = validateFileNoteInput(this.state);
      if (!isValid) {
        this.setState({ errors : errors });
      }
      return isValid;
    }
      
      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

    render(){
      const { errors } = this.state;
        return (
          <div>
          <NavBar/>
          <div className="container-fluid">
        <div className="row content">
          <SideNavFileDashboard/>
          <div className="jumbotron col-sm-10">
                <div className="col-sm-8">
        <form onSubmit={this.onSubmit}>
                <div className="form-group">
                <label for="lastName">File Notes</label>
                    <textarea className="form-control" 
                    id="fileSummary"
                    name="fileNote"
                    id="fileNote"
                    value={this.state.fileNote}
                    onChange={this.onChange}  
                    rows="5"/>
                    {errors.fileNote && (
                        <span style={{ color: 'red' }}>{errors.fileNote}</span>
                    )}
                </div>
                <div className="form-group" style={{'textAlign': 'right'}}>
            <Button type="submit" color="primary" onClick={this.onSubmit} className="btn btn-primary" >Save</Button>&nbsp;
            </div>
         </form>
                    <div>
                        <FileNoteList/>
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

FileNoteForm.propTypes = {
  addFileNote: PropTypes.func.isRequired,
  message: PropTypes.shape({
      success: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
  }),
  auth: PropTypes.shape({
      currentUser: PropTypes.object.isRequired
  })
};

  const mapStateToProps = state => ({
    file: state.fileManagementReducer,
    message: state.messageHandlingReducer,
    auth: state.authenticationReducer
});

export default connect(mapStateToProps, { addFileNote })(FileNoteForm);
