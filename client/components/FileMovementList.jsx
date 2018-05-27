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
        this.props.recieveFileMovementForFile(this.props.selectedFile.id);
      }
    }

    render(){
        return (
            <div>
            <h2>FILE MOVEMENT LOG</h2>
              <table className="table table-striped">
              <thead>
                <tr>
                  <th>Date Moved</th>
                  <th>Moved From</th>
                  <th>Moved To</th>
                  <th>Moved By</th>
                </tr>
              </thead>
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
    selectedFile: state.fileManagementReducer.selectedFile,
    fileMovements: state.fileManagementReducer.fileMovements
});

export default connect(mapStateToProps, {recieveFileMovementForFile})(FileMovementList);
