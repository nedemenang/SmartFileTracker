import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recieveFileMovementForFile } from '../actions/index.js';
import FileMovement from './FileMovement.jsx';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import SideNav from './Sidenav.jsx';
import 'react-table/react-table.css';
import ReactTable from "react-table";


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
        const columns = [{
            Header: 'Date',
            accessor: 'DateMoved' 
          }, {
            Header: 'Moved From Department',
            accessor: 'movedFromDepartment' 
          }, {
            Header: 'Moved To Department',
            accessor: 'movedToDepartment' 
          }, {
            Header: 'Moved By',
            accessor: 'movedBy' 
          }]
        return (
            <div>
            <h2>FILE MOVEMENT LOG</h2>
            <ReactTable
                  data={this.props.fileMovements}
                  columns={columns}
                  defaultPageSize={6}
                />
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
