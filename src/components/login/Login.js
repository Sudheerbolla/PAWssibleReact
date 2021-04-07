import React, { Component } from 'react';
import { login } from '../../services/services';
import LoadingOverlay from 'react-loading-overlay';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMsg: false,
      isActive : false
    }
  }

  login = async (e) => {
    e.preventDefault();
    if (this.state.email && this.state.password) {
      await this.setState({ errorMsg: false, isActive : true });
      // var res = await login({ "email": this.state.email, "password" : this.state.password }, this.setState);
      var res = await login({ "email": this.state.email, "password" : this.state.password });
      console.log("api response: " + JSON.stringify(res));
      if (res && res.user) {
        localStorage.setItem('userId', res.user._id);
        localStorage.setItem('name', res.user.name);
        localStorage.setItem('userType', res.user.userType);
        localStorage.setItem('userData', JSON.stringify(res.user));
        this.setState({ errorMsg: false, isActive : false });
        this.props.history.push({
          pathname: '/home'
        })
      }
      else {
        this.setState({ errorMsg: true, isActive : false });
      }
    }
    else {
      this.setState({ errorMsg: true });
    }

  }

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
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
          <div className="card-header"><h5>Sign In</h5></div>
          <div className="card-body">
            {this.state.errorMsg ?
              <div className="alert alert-danger">
                <span style={{ color: 'red' }}> Invalid Credentials </span>
              </div>
              : ''
            }
            <div className="row justify-content-sm-center">
              <div className="col-md-9">
                <form className="form-signin" onSubmit={this.login}>
                  <input type="text" className="form-control mb-3" placeholder="Email Address" value={this.state.email} onChange={this.onChangeEmail} />
                  <input type="password" className="form-control mb-3" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} />
                  <button type="submit" className="btn btn-small btn-success btn-block mt-2">Login</button>
                </form>
              </div>
            </div>
          </div>
          </LoadingOverlay>
        </div>
      </div>
    );
  }
}


export default (Login)

// import React, { Component } from "react";

// export default class Login extends Component {
    
//     constructor(props){
//         super(props);
//         this.state={
//             username:'',
//             password:''
//         }
//     }

//     render() {
//         return (
//         <form>
//                 <h3>LogIn</h3>
//                 <div className="form-group">
//                     <label>Email address</label>
//                     <input type="email" className="form-control" placeholder="Enter email" value={this.email} />
//                 </div>

//                 <div className="form-group">
//                     <label>Password</label>
//                     <input type="password" className="form-control" placeholder="Enter password" value={this.password} />
//                 </div>

//                 <button type="submit" className="btn btn-primary btn-block">Submit</button>
//                 <p className="forgot-password text-right">
//                     Forgot <a href="#">password?</a>
//                 </p>
//         </form>
//         );
//     }
// }