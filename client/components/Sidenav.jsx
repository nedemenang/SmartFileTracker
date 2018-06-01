import React, {Component} from 'react';
import { connect } from 'react-redux';

class Sidenav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userRole: this.props.currentUser.role
        }

    }

    componentWillMount() {
        if (this.props.currentUser) {
            this.setState({
                userRole: this.props.currentUser.role
            })
        }
    }

    render(){
        return (
              <div className="col-sm-2 sidenav1">
                <ul className="nav nav-pills flex-column">
                  <li className="nav-item"><a className="nav-link" href="/new-file">New File</a></li>
                  <li className="nav-item"><a className="nav-link" href="/password-reset">Password Reset</a></li>
                  {
                      this.state.userRole === "admin" &&
                    <div>
                      <li className="nav-item"><a className="nav-link" href="/new-user">New User</a></li>
                    <li className="nav-item"><a className="nav-link" href="/new-department">New Department</a></li>
                    </div>
                      
                  }
                </ul><br/>
              </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.authenticationReducer.user,
    files: state.fileManagementReducer.files
    
});

export default connect(mapStateToProps, {})(Sidenav);

