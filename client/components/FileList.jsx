import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recieveFilesByDepartment, recieveFiles } from '../actions/index.js';
import FileItem from './FileItem.jsx';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import SideNav from './Sidenav.jsx';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { selectFile } from '../actions/index.js';
import lodash from 'lodash';
import toastr from 'toastr';
import dateFormat from 'dateformat';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class FileList extends Component {

    constructor(props) {
        super(props);

        if(this.props.currentUser) {
          const department = {
            departmentId: this.props.currentUser.department
          }
          if (this.props.currentUser.role === 'admin') {
            this.props.recieveFiles();
          } else {
            this.props.recieveFilesByDepartment(department);
          }
        }

        this.state = {
          searchParameter: '',
          searchedArray: this.props.files,
          dateFrom: '',
          dateTo: ''
        }
        this.onChangeNameSearch = this.onChangeNameSearch.bind(this);
        this.onChangeDateTo = this.onChangeDateTo.bind(this);
        this.onChangeDateFrom = this.onChangeDateFrom.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          searchedArray: nextProps.files
        })
     }

     onChangeDateFrom(date) {
      this.setState({
        searchedArray: this.props.files,
        dateFrom: date
      })
    }

    onSearchClick(e){
      e.preventDefault()
      const dateFrom = document.getElementById("dateFrom").value;
      const dateTo = document.getElementById("dateTo").value;
      if (dateFrom !== '' || dateTo !== '') {
        this.setState({
          searchedArray: lodash.filter(this.props.files, function(o){
             const df = moment(dateFrom)
             const dt = moment(dateTo)
             return moment(o.CreateOn).isAfter(df) && moment(o.CreateOn).isBefore(dt)
          })
        })
       }
    }

     onChangeDateTo(date) {
       this.setState({
         searchedArray: this.props.files,
         dateTo: date
       })
     }

     onChangeNameSearch(e) {
      e.preventDefault()
      this.setState({[e.target.name]: e.target.value});

        this.setState({ searchedArray:
          this.props.files });

        this.setState({
            searchedArray: lodash.filter(this.props.files, function(o) {
              return o.Name.toLowerCase().indexOf(e.target.value.trim()) > -1 
            })
        })
  }

    render(){
      const columns = [{
        Header: 'File No',
        accessor: 'FileNo' 
      }, {
        Header: 'File Name',
        accessor: 'Name' 
      }, {
        Header: 'File Description',
        accessor: 'FileDescription' 
      }, {
        Header: 'Location',
        accessor: 'CurrentDepartment' 
      }, {
        Header: 'Date Created',
        accessor: `CreateOn`,
        Cell: props => <span className='string'>{dateFormat(props.value, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</span>
      }, {
        header: '',
        id: 'click-me-button',
        Cell: props => (<button className="btn btn-success">View</button>)
      }]
        return (
            <div>
              <NavBar/>
              <div className="container-fluid">
            <div className="row content">
              <SideNav/>
              
              <div className="col-sm-10">
              <div className="row">
              <div className="col-sm-6">
                <h1>File List</h1>
                </div>
                <div className="col-sm-6">
               <input type="text" 
                    value={this.state.searchParameter}
                    onChange={this.onChangeNameSearch}
                    className="form-control" 
                    name="searchParameter"
                    id="searchParameter" 
                    placeholder="Search By File name"/>
                    <div className="row">
                    <div className="col-sm-6">
               <DatePicker
               selected={this.state.dateFrom}
               id="dateFrom"
               dateFormat="LLL"
               value={this.state.dateFrom}
                placeholderText="Search Start Date"
                onChange={this.onChangeDateFrom}/>
                </div>
              <div className="col-sm-6">
              <DatePicker
                selected={this.state.dateTo}
                id="dateTo"
                dateFormat="LLL"
                value={this.state.dateTo}
                onChange={this.onChangeDateTo}
                placeholderText="Search End Date"/>
                <button className="btn btn-success" onClick={this.onSearchClick}>Search</button>
                </div>
                 </div>
               </div>
               </div>
               <hr/>
                <ReactTable
                  data={this.state.searchedArray}
                  columns={columns}
                  defaultPageSize={6}
                  getTdProps={(state, rowInfo, column, instance) => {
                    return {
                      onClick: (e, handleOriginal) => {
                        this.props.selectFile(rowInfo.original)
                        this.context.router.history.push('/file-view');
                        if (handleOriginal) {
                          handleOriginal();
                        }
                      }
                    };
                  }}
                />
               </div>
               
               </div>
               </div>
              <Footer/>
          </div>        
        );
    }
}

FileList.propTypes = {
  recieveFilesByDepartment: PropTypes.func.isRequired,
  selectFile: PropTypes.func.isRequired,
  recieveFiles: PropTypes.func.isRequired
};

FileList.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
      currentUser: state.authenticationReducer.user,
      files: state.fileManagementReducer.files
      
});

export default connect(mapStateToProps, {recieveFilesByDepartment, selectFile, recieveFiles})(FileList);
