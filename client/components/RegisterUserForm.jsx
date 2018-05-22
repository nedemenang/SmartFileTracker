import React, {Component} from 'react';

class RegisterUserForm extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="jumbotron col-md-offset-8">
                    <div className="col-md-8 col-md-offset-8">
            <form>
                <legend>User Form</legend>
                <div className="form-group">
                    <label for="firstname">First Name</label>
                    <input type="text" 
                    className="form-control" 
                    id="firstName" 
                    placeholder="Enter First Name"/>
                </div>
                <div className="form-group">
                <label for="lastName">Last Name</label>
                    <input type="text"
                    className="form-control" 
                    id="lastName"
                    placeholder="Enter Last Name"/>
                </div>
                <div className="form-group">
                    <label for="userName">User Name</label>
                    <input type="text" 
                    className="form-control" 
                    id="username" 
                    placeholder="Enter username"/>
                </div>
                <div className="form-group">
                    <label for="department">Department</label>
                    <select className="form-control" 
                    id="department">
                        <option>1</option>
                        <option>2</option>
                    </select>
                </div>
                <div className="form-group">
                    <label for="role">Role</label>
                    <select className="form-control" 
                    id="role">
                        <option>Facilities</option>
                        <option>Accounting</option>
                        <option>IT</option>
                    </select>
                </div>
                <div className="form-group" style={{'textAlign': 'right'}}>
                    <button type="submit" class="btn btn-primary" >Submit</button>
                </div>
            </form>
            </div>
            </div>
        );
    }
}
export default RegisterUserForm
