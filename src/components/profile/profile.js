import React, { Component } from 'react';
import { updateUser } from '../../services/services';
import "./profile.css";
import { Dropdown, DropdownButton } from 'react-bootstrap';

class Profile extends Component {
  
  user={};

  constructor(props){
    super(props);
    this.state = {
        email: '',
        password: '',
        name: '',
        phone: '',
        address: '',
        userType: '',
        errorMsg: false,
        isActive : false
    }  
  }

  async componentDidMount() {
    const userObj = JSON.parse(localStorage.getItem('userData'));
    if(userObj.name || userObj.email) {
        this.user = {
            _id:userObj._id,
            name:userObj.name,
            email:userObj.email,
            password:userObj.password,
            phone:userObj.phone,
            userType:userObj.userType,
            address:userObj.address
        };
        this.setState({
            name:userObj.name,
            email:userObj.email,
            password:userObj.password,
            phone:userObj.phone,
            userType:userObj.userType,
            address:userObj.address
        });
    }
  }

  getUserObj() {
      return {
        _id:this.user._id,
        name:this.state.name,
        email:this.state.email,
        password:this.state.password,
        phone:this.state.phone,
        userType:this.state.userType,
        address:this.state.address
      }
  }

  onChangeEvent = (event) => {
    this.setState({[event.target.name]: event.target.value, errorMsg:false})
  }

  updateProfile = async (e) => {
    e.preventDefault();
    const userObj=this.getUserObj();
    if( JSON.stringify(this.user) === JSON.stringify(userObj) ) {
        this.setState({errorMsg: true});
    } else{
        await updateUser(userObj);  
        this.props.history.push('/home'); 
    }
  }

  skipClicked = () =>{
    this.props.history.push('/home');
  }

  handleSelect = (e) => {
    console.log(e);
    this.setState({'userType':e});
  }

  render() {
      return (
        <div className="App section light-bg">    
        <div className="container">
          <div className="section-title text-left"><h3>Profile</h3></div>
            <div className="card-body">
            {
                this.state.errorMsg ?
                    <div className="alert alert-danger">
                        <span style={{ color: 'red' }}> Please modify the data to continue </span>
                    </div>
                    : ''
            }
            <div className="row justify-content-sm-center">
                <div className="col-md-2 mt-3">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" size="100" height="100" width="100" xmlns="http://www.w3.org/2000/svg"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg>
                </div>
                <div className="col-md-7">
                <form className="form-signin" onSubmit={this.updateProfile}>
                <div className="row">
                    <div className="col-md-3 mt-2">
                    Name
                    </div>
                    <div className="col-md-8">
                    <input type="text" className="form-control mb-2" name="name" placeholder="Enter Name here" value={this.state.name} onChange={this.onChangeEvent}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 mt-2">
                    Email
                    </div>
                    <div className="col-md-8">
                    <input type="email" className="form-control mb-2"  name="email" placeholder="Enter Email here" disabled value={this.state.email} onChange={this.onChangeEvent}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 mt-2">
                    Password
                    </div>
                    <div className="col-md-8">
                    <input type="password" className="form-control mb-3" placeholder="Enter your Password" name="password" value={this.state.password} onChange={this.onChangeEvent} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 mt-2">
                    Phone
                    </div>
                    <div className="col-md-8">
                    <input type="number" className="form-control mb-3" placeholder="Enter your Phone Number" name="phone" value={this.state.phone} onChange={this.onChangeEvent} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 mt-2">
                    Address
                    </div>
                    <div className="col-md-8">
                    <input type="text" className="form-control mb-3" placeholder="Enter your Address" name="address" value={this.state.address} onChange={this.onChangeEvent} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 mt-2">
                    User Type
                    </div>
                    <div className='col-md-8'>
                    <DropdownButton title={this.state.userType?(this.state.userType==="C"?"Customer":"Owner"):"Select User Type"} id="dropdown-basic-button" onSelect={this.handleSelect}>
                            <Dropdown.Item eventKey="C">Customer</Dropdown.Item>
                            <Dropdown.Item eventKey="O">Owner</Dropdown.Item>
                    </DropdownButton>
                    </div>
                  
                </div>
                
                <div className="row mt-4">
                    <div className="col-md-3"></div>
                    <div className="col-md-3 mr-3">
                    <button type="submit" className="btn btn-success btn-sm">Save and Continue</button>
                    </div>
                    <div className="col-md-3">
                    <button type="button" className="btn btn-dark btn-sm" onClick={this.skipClicked}>Back</button>    
                    </div>
                </div>
                </form>
            </div>
            <div className="col-md-3"></div>
            </div>
            </div>
          </div>
      </div>
      );
    }
}
//   <div className="col-md-8">
// <input type="text" className="form-control mb-3" placeholder="Enter your Address" name="address" value={this.state.address} onChange={this.onChangeEvent} />
// </div>
export default Profile ;
