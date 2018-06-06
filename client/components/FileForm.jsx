import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import SideNav from './Sidenav.jsx';
import { addFile, recieveFilesByDepartment, recieveFiles } from '../actions/index.js';
import { validateFileInput } from '../validation/validation.js';
import toastr from 'toastr';

class FileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileNo : '',
            fileName: '',
            fileDescription : '',
            selectedFile: null,
            currentDepartment: this.props.auth.currentUser.department,
            fileLink: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        if (e.target.name === 'fileLink')
        {
            var _validFileExtensions = [".pdf"];
            var sFileName = e.target.value;
            if (sFileName.length > 0) {
                var blnValid = false;
                for (var j = 0; j < _validFileExtensions.length; j++) {
                    var sCurExtension = _validFileExtensions[j];
                    if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                        blnValid = true;
                        break;
                    }
                }
                
                if (!blnValid) {
                    toastr.error("Sorry, " + sFileName + " is invalid, allowed file types are: " + _validFileExtensions.join(", "));
                    e.target.value = "";
                    return false;
                }
            }
            this.setState({
                selectedFile: e.target.files[0]
            })
        }
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ errors: {} });
        const department = {
            departmentId: this.props.auth.currentUser.department
          }
        if (this.isValid()) {
            this.props.addFile(this.state).then((response) => {
              if (response) {
                toastr.success(`${this.props.message.success}`);
              } else {
                toastr.warning(`${this.props.message.error}`);
              }
            });
          }
    }

    isValid() {
        const { errors, isValid } = validateFileInput(this.state);
        if (!isValid) {
          this.setState({ errors : errors });
        }
        return isValid;
      }

    render(){
        const { errors } = this.state;
        return (
            <div>
              <NavBar/>
              <div className="container-fluid">
            <div className="row content">
              <SideNav/>
            <div className="jumbotron col-sm-10">
                    <div className="col-sm-8">
            <form onSubmit={this.onSubmit}>
                <legend>File Form</legend>
                <div className="form-group">
                    <label for="fileNo">File No</label>
                    <input type="text" 
                    value={this.state.fileNo}
                    onChange={this.onChange}
                    className="form-control" 
                    name="fileNo"
                    id="fileNo" 
                    placeholder="File No here"/>
                    {errors.fileNo && (
                        <span style={{ color: 'red' }}>{errors.fileNo}</span>
                    )}
                </div>
                <div className="form-group">
                    <label for="fileName">File Name</label>
                    <input type="text" 
                    value={this.state.fileName}
                    onChange={this.onChange}
                    className="form-control" 
                    name="fileName"
                    id="fileName" 
                    placeholder="File Name here"/>
                    {errors.fileName && (
                        <span style={{ color: 'red' }}>{errors.fileName}</span>
                    )}
                </div>
                <div className="form-group">
                <label for="fileDescription">File Summary</label>
                    <textarea className="form-control" 
                    value={this.state.fileDescription}
                    onChange={this.onChange}
                    name="fileDescription"
                    id="fileDescription" 
                    rows="5"/>
                    {errors.fileDescription && (
                        <span style={{ color: 'red' }}>{errors.fileDescription}</span>
                    )}
                </div>
                <div className="form-group">
                    <label for="fileLink">File Link</label>
                    <input type="file" 
                        value={this.state.fileLink}
                        onChange={this.onChange}
                        className="form-control-file" 
                        name="fileLink"
                        id="fileLink" 
                        aria-describedby="fileHelp"/>
                        {errors.fileLink && (
                        <span style={{ color: 'red' }}>{errors.fileLink}</span>
                    )}
                </div>
                <div className="form-group" style={{'textAlign': 'right'}}>
                    <button type="submit" class="btn btn-primary" >Submit</button>
                </div>
            </form>
            </div>
            </div>
               </div>
               </div>
              <Footer/>
          </div>      
        );
    }
}


FileForm.propTypes = {
    addFile: PropTypes.func.isRequired,
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
  
export default connect(mapStateToProps, { addFile })(FileForm);

