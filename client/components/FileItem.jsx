import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectFile } from '../actions/index.js';

class FileItem extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        const { fileItem } = this.props;
        this.props.selectFile(fileItem)
        this.context.router.history.push('/file-view');
    }

    render(){
        const { fileItem } = this.props;
        return (
            <tr>
                  <td>{fileItem.id}</td>
                  <td>{fileItem.FileNo}</td>
                  <td>{fileItem.Name}</td>
                  <td>{fileItem.FileDescription}</td>
                  <td><a className="btn btn-primary" onClick={this.onClick}>View</a></td>
                </tr>
        );
    }
}

FileItem.propTypes = {
    selectFile: PropTypes.func.isRequired
};
  
FileItem.contextTypes = {
    router: PropTypes.object.isRequired,
};
  
const mapStateToProps = state => ({
    file: state.fileManagementReducer
});

export default connect(mapStateToProps, { selectFile })(FileItem);
