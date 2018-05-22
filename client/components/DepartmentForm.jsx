import React, {Component} from 'react';

class DepartmentForm extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="jumbotron col-md-offset-8">
                    <div className="col-md-8 col-md-offset-8">
            <form>
                <div className="form-group">
                    <label for="departmentName">Department Name</label>
                    <input type="text" 
                    className="form-control" 
                    id="departmentName" 
                    placeholder="Enter Department Name"/>
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
export default DepartmentForm
