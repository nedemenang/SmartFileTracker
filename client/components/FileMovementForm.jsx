import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FileNoteForm from './FileNoteForm.jsx';

class FileMovementForm extends Component {
    constructor() {
        super();
     
        this.state = {
          numPages: null,
          pageNumber: 1,
          modal: false
        };
     
        this.toggle = this.toggle.bind(this);
      }
      
      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

    render(){
        return (
            <div className="row">
                    <div className="col-md-4 col-md-offset-4">
        <Button color="primary" onClick={this.toggle}>Move File</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
          <legend>File Movement Form</legend>
                <div className="form-group">
                    <label for="department">Move To</label>
                    <select className="form-control" 
                    id="department">
                        <option>1</option>
                        <option>2</option>
                    </select>
                </div>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" className="btn btn-primary" >Move</Button>&nbsp;
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
            </div>
            <div className="col-md-8 col-md-offset-8">
            <FileNoteForm/>
            </div>
            </div>
        );
    }
}


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
    
  }
export default FileMovementForm
