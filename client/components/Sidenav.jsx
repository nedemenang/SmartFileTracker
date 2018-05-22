import React, {Component} from 'react';

class Sidenav extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
              <div className="col-sm-2 sidenav1">
                <ul className="nav nav-pills flex-column">
                  <li className="nav-item"><a className="nav-link" href="/new-file">New File</a></li>
                </ul><br/>
              </div>
        );
    }
}


export default Sidenav;
