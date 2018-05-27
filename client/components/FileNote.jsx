import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FileNote extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const { fileNote } = this.props;
        return (
            <tr>
                <td>{fileNote.DateCreated}</td>
                  <td>{fileNote.notes} </td>
                  <td> {fileNote.notesBy} </td>
                </tr>
        );
    }
}

  
const mapStateToProps = state => ({
    file: state.fileManagementReducer
});

export default connect(mapStateToProps, {})(FileNote);
