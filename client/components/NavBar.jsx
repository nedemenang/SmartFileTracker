import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOut } from '../actions/index.js';

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault
        this.props.logOut()
    }

    render(){
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="file-list">SMART FILE TRACKER</a>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="file-list">File List<span class="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/new-file">New File</a>
                    </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <button class="btn btn-outline-danger my-2 my-sm-0" onClick={this.onClick} type="submit">Log Out</button>
                    </form>
                </div>
                </nav>
            </div>
        );
    }
}

NavBar.propTypes = {
    logOut: PropTypes.func.isRequired,
  };
  

export default connect(null, {logOut})(NavBar);
