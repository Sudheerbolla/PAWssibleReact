import React, { Component } from 'react';
import { register } from '../../services/services';
import LoadingOverlay from 'react-loading-overlay';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import "./signup.css";

class SignUp extends Component {

  constructor(props) {
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

  register = async (e) => {
    e.preventDefault();
    if (this.state.email && this.state.password && this.state.phone && this.state.address && this.state.name && this.state.userType) {
      await this.setState({ errorMsg: false, isActive : true });
      var requestBody={ 
          "email": this.state.email, 
          "password" : this.state.password,
          "phone" : this.state.phone,
          "address" : this.state.address,
          "name" : this.state.name,
          "userType" : this.state.userType,
     };
      var res = await register(requestBody);
      if (res && res.user) {
        localStorage.setItem('userId', res.user._id);
        localStorage.setItem('name', res.user.name);
        localStorage.setItem('userType', res.user.userType);
        localStorage.setItem('userData', JSON.stringify(res.user));
        this.setState({ errorMsg: false, isActive : false });
        this.props.history.push({
          pathname: '/home'
        })
        // for showing header, manually reloading.
        window.location.reload();
      }
      else {
        this.setState({ errorMsg: true, isActive : false });
      }
    }
    else {
      this.setState({ errorMsg: true });
    }
  }

  navigateToLogin = async (e) => {
    e.preventDefault();
    this.props.history.push({
      pathname: '/login'
    })
  }

  onChangeField = (event) => {
    this.setState({
        ...this.state,
        [event.target.name]: event.target.value
      });
  }

  handleSelect = (e) => {
      console.log(e);
      this.setState({'userType':e});
  }

  render() {
    return (
      <div className="login-wrapper">
        <div className="col-sm-10 col-md-4 login">
        <LoadingOverlay
          active={this.state.isActive}
          spinner
          text='Loading your content...'
        >
          <div className="card-header"><h5>User Registration</h5></div>
          <div className="card-body">
            {this.state.errorMsg ?
              <div className="alert alert-danger">
                <span style={{ color: 'red' }}>Enter complete data</span>
              </div>
              : ''
            }
            <div className="row justify-content-sm-center">
              <div className="col-md-9">
                <form className="form-signin" >
                  <input type="text" className="form-control mb-3" placeholder="Enter your Name" name="name" value={this.state.name} onChange={this.onChangeField} />
                  <input type="text" className="form-control mb-3" placeholder="Enter your Email Address" name="email" value={this.state.email} onChange={this.onChangeField} />
                  <input type="password" className="form-control mb-3" placeholder="Enter your Password" name="password" value={this.state.password} onChange={this.onChangeField} />
                  <input type="phone" className="form-control mb-3" placeholder="Enter your Phone Number" name="phone" value={this.state.phone} onChange={this.onChangeField} />
                  <input type="text" className="form-control mb-3" placeholder="Enter your Address" name="address" value={this.state.address} onChange={this.onChangeField} />
                  <div className='dropdown'>
                    <DropdownButton title={this.state.userType?(this.state.userType==="C"?"Customer":"Owner"):"Select User Type"} id="dropdown-basic-button" onSelect={this.handleSelect}>
                            <Dropdown.Item eventKey="C">Customer</Dropdown.Item>
                            <Dropdown.Item eventKey="O">Owner</Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <button type="submit" onClick={this.register} className="btn btn-primary btn-block">Register</button>
                  <p>
                      Existing User? Login Here
                  </p>
                  <button type="submit" onClick={this.navigateToLogin} className="btn btn-primary btn-block">Login</button>
                </form>
              </div>
            </div>
          </div>
          </LoadingOverlay>
        </div>
      </div>
    );
  }
//                     <input type="spinner" className="form-control mb-3" placeholder="Customer" name="address" value={this.state.address} onChange={this.onChangeField} />

}

export default SignUp;
