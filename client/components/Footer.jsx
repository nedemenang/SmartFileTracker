import React, {Component} from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const d = new Date();
        const year = d.getFullYear();
        return (
        <div>
            <footer className="container-fluid">
        <p>&copy; {year}</p>
          </footer> 
        </div>        
        );
    }
}

export default Footer;
