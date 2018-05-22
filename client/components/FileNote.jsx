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
                  <td>{fileNote.notes} <br/>
                  <p><small>
                        {fileNote.notesBy} - {fileNote.DateCreated}
                        </small></p>
                  </td>
                </tr>
        );
    }
}

  
const mapStateToProps = state => ({
    file: state.fileManagementReducer
});

export default connect(mapStateToProps, {})(FileNote);
