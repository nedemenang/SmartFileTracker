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
                <td>{fileMovement.DateMoved}</td>
                  <td>{fileMovement.movedFromDepartment} </td>
                  <td> {fileMovement.movedToDepartment} </td>
                       <td>{fileMovement.movedBy}</td>
                </tr>
        );
    }
}

  
const mapStateToProps = state => ({
    file: state.fileManagementReducer
});

export default connect(mapStateToProps, {})(FileMovement);
