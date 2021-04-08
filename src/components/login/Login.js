import React, { Component } from 'react';
import { login, resetPassword } from '../../services/services';
import "./login.css";
import LoadingOverlay from 'react-loading-overlay';
import Modal from "react-modal";

Modal.setAppElement("#root");

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMsg: false,
      isActive : false,
      isModalOpen : false,
      forgEmail: '',
      forgPassword: ''
    }
  }

  login = async (e) => {
    e.preventDefault();
    if (this.state.email && this.state.password) {
      await this.setState({ errorMsg: false, isActive : true });
      var res = await login({ "email": this.state.email, "password" : this.state.password }, this.setState);
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

  navigateToSignUp = async (e) => {
    e.preventDefault();
    this.props.history.push({
      pathname: '/signup'
    })
  }

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  onChangeForgEmail = (event) => {
    this.setState({ forgEmail: event.target.value });
  }

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  onChangeForgPassword = (event) => {
    this.setState({ forgPassword: event.target.value });
  }

  handleClick = async (e) => {
    e.preventDefault();
    if(this.state.isOpen) {
      if (this.state.email && this.state.password) {
        var res = await resetPassword({ "email": this.state.forgEmail, "password" : this.state.forgPassword });
        if (res && res.user) {
          localStorage.clear();
          alert("Successfully rest password")
          this.setState({"isOpen":false});
          // , ()=> {
            // localStorage.clear();
            // await this.setState({'userId': null });           
          // });
        }
      }
    } else 
      this.setState({"isOpen":true});
  };

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
                <span style={{ color: 'red' }}>Enter Valid Data</span>
              </div>
              : ''
            }
            <div className="row justify-content-sm-center">
              <div className="col-md-9">
                <form className="form-signin" >
                  <input type="text" className="form-control mb-3" placeholder="Email Address" value={this.state.email} onChange={this.onChangeEmail} />
                  <input type="password" className="form-control mb-3" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} />
                  <p>
                      <a href="#" onClick={this.handleClick}>forgot password?</a>
                  </p>
                  <button type="submit" onClick={this.login} className="btn btn-primary btn-block">Login</button>
                  <p>
                      New User? Register Here
                  </p>
                  <button type="submit" onClick={this.navigateToSignUp} className="btn btn-primary btn-block">Sign Up</button>
                </form>
              </div>
            </div>
          </div>
          </LoadingOverlay>
        </div>

      <Modal
        isOpen={this.state.isOpen}
        contentLabel="Forgot Password "
        className="forgotpasswordmodal"
        overlayClassName="forgotpasswordoverlay"
        onRequestClose={this.handleClick}
        contentLabel="Forgot Password">
        <div>Forgot Password.</div>

        <input type="text" className="form-control mb-3" placeholder="Email Address" value={this.state.forgEmail} onChange={this.onChangeForgEmail} />
        <input type="password" className="form-control mb-3" placeholder="Password" value={this.state.forgPassword} onChange={this.onChangeForgPassword} />
        <button type="submit" onClick={this.handleClick} className="btn btn-primary btn-block">Reset Password</button>
        
      </Modal>
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