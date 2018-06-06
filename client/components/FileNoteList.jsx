import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recieveFileNoteForFile } from '../actions/index.js';
import FileNote from './FileNote.jsx';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import SideNav from './Sidenav.jsx';
import 'react-table/react-table.css';
import ReactTable from "react-table";
import dateFormat from 'dateformat';


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
        const columns = [{
            Header: 'Date',
            accessor: 'DateCreated',
            Cell: props => <span className='string'>{dateFormat(props.value, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</span>
          }, {
            Header: 'Notes',
            accessor: 'notes' 
          }, {
            Header: 'Notes By',
            accessor: 'notesBy' 
          }]
        return (
            <div>
            <h2>FILE NOTES LOG</h2>
            <ReactTable
                  data={this.props.fileNotes}
                  columns={columns}
                  defaultPageSize={6}
                />
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
