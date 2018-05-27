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
        this.props.recieveFileNoteForFile(this.props.selectedFile.id);
      }
    }

    render(){
        return (
            <div>
            <h2>FILE NOTES LOG</h2>
              <table className="table table-striped">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Notes</th>
                  <th>Notes By</th>
                </tr>
              </thead>
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
      fileNotes: state.fileManagementReducer.fileNotes,
      selectedFile: state.fileManagementReducer.selectedFile
});

export default connect(mapStateToProps, {recieveFileNoteForFile})(FileNoteList);
