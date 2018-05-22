import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FileMovement extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const { fileMovement } = this.props;
        return (
            <tr>
                  <td>{fileMovement.MovedFrom} to {fileMovement.MovedTo} <br/>
                  <p><small>
                        {fileNote.DateMoved} - {fileNote.MovedBy}
                        </small></p>
                  </td>
                </tr>
        );
    }
}

  
const mapStateToProps = state => ({
    file: state.fileManagementReducer
});

export default connect(mapStateToProps, {})(FileMovement);
