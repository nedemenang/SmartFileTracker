import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recieveFileNoteForFile } from '../actions/index.js';
import FileNote from './FileNote.jsx';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import SideNav from './Sidenav.jsx';


class FileNoteList extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
      if(this.props.selectedFile) {
        this.props.recieveFileNoteForFile(selectedFile);
      }
    }

    render(){
        return (
            <div>
              <table className="table table-striped">
              <tbody>
              {
                  this.props.fileNotes.map((fileNote, i) => (
                    <FileNote fileNote={fileNote} key={i}/>
                ))
            }
               </tbody>
               </table>
               </div>      
        );
    }
}

FileNoteList.propTypes = {
    recieveFileNoteForFile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
      files: state.fileManagementReducer.files
});

export default connect(mapStateToProps, {recieveFileNoteForFile})(FileNoteList);
