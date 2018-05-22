import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { addFileNote } from '../actions/index.js';
import { validateFileNoteInput } from '../validation/validation.js';
import toastr from 'toastr';

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
      console.log(this.state);
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
        <Button color="primary" onClick={this.toggle}>Minute</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}><legend>File Note Form</legend></ModalHeader>
          <ModalBody>
                <div className="form-group">
                <label for="lastName">File Notes</label>
                    <textarea className="form-control" 
                    id="fileSummary"
                    name="fileNote"
                    id="fileNote"
                    onChange={this.onChange}  
                    rows="5"/>
                    {errors.fileNo && (
                        <span style={{ color: 'red' }}>{errors.fileNo}</span>
                    )}
                </div>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" onClick={this.onSubmit} className="btn btn-primary" >Save</Button>&nbsp;
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
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


Modal.propTypes = {
    // boolean to control the state of the popover
    isOpen:  PropTypes.bool,
    autoFocus: PropTypes.bool,
    // if modal should be centered vertically in viewport
    centered: PropTypes.bool,
    // corresponds to bootstrap's modal sizes, ie. 'lg' or 'sm'
    size: PropTypes.string,
    // callback for toggling isOpen in the controlling component
    toggle:  PropTypes.func,
    role: PropTypes.string, // defaults to "dialog"
    // used to reference the ID of the title element in the modal
    labelledBy: PropTypes.string,
    keyboard: PropTypes.bool,
    // control backdrop, see http://v4-alpha.getbootstrap.com/components/modal/#options
    backdrop: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['static'])
    ]),
    // allows for a node/componet to exist next to the modal (outside of it). Useful for external close buttons
    // external: PropTypes.node,
    // called on componentDidMount
    onEnter: PropTypes.func,
    // called on componentWillUnmount
    onExit: PropTypes.func,
    // called when done transitioning in
    onOpened: PropTypes.func,
    // called when done transitioning out
    onClosed: PropTypes.func,
    className: PropTypes.string,
    wrapClassName: PropTypes.string,
    modalClassName: PropTypes.string,
    backdropClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    // boolean to control whether the fade transition occurs (default: true)
    fade: PropTypes.bool,
    cssModule: PropTypes.object,
    // zIndex defaults to 1000.
    zIndex: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    
  };

  const mapStateToProps = state => ({
    file: state.fileManagementReducer,
    message: state.messageHandlingReducer,
    auth: state.authenticationReducer
});

export default connect(mapStateToProps, { addFileNote })(FileNoteForm);
