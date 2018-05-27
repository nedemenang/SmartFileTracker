import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

class Sidenav extends Component {
    constructor(props) {
        super(props);
    }



    render(){
        return (
              <div className="col-sm-2 sidenav1">
                <ul className="nav nav-pills flex-column">
                  <li className="nav-item"><a className="nav-link" href="/new-file">New File</a></li>
                  <li className="nav-item"><a className="nav-link" href="/file-movements">File Movements</a></li>
                  <li className="nav-item"><a className="nav-link" href="/file-notes">File Notes</a></li>
                </ul><br/>
              </div>
        );
    }
}


const mapStateToProps = state => ({
  selectedFile: state.fileManagementReducer.selectedFile,
  department: state.departmentReducer.department
});

export default connect(mapStateToProps, {})(Sidenav);
