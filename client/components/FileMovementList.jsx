import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recieveFileMovementForFile } from '../actions/index.js';
import FileMovement from './FileMovement.jsx';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import SideNav from './Sidenav.jsx';


class FileMovementList extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
      if(this.props.selectedFile) {
        this.props.recieveFileMovementForFile(selectedFile);
      }
    }

    render(){
        return (
            <div>
              <table className="table table-striped">
              <tbody>
              {
                  this.props.fileMovements.map((fileMovement, i) => (
                    <FileMovement fileMovement={fileMovement} key={i}/>
                ))
            }
               </tbody>
               </table>
               </div>      
        );
    }
}

FileMovementList.propTypes = {
    recieveFileMovementForFile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
      files: state.fileManagementReducer.files  
});

export default connect(mapStateToProps, {recieveFileMovementForFile})(FileMovementList);
