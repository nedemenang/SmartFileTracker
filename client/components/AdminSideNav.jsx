import React, {Component} from 'react';

class Sidenav extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
              <div className="col-sm-2 sidenav1">
                <ul className="nav nav-pills flex-column">
                  <li className="nav-item"><a className="nav-link" href="/files">Files</a></li>
                  <li className="nav-item"><a className="nav-link" href="/departments">Departments</a></li>
                  <li className="nav-item"><a className="nav-link" href="/users">Users</a></li>
                </ul><br/>
              </div>
              
          </div>        
        );
    }
}

export default Sidenav;
