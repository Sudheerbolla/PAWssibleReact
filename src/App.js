import React,{Component} from 'react';
import Header from './common/header/header';
import Footer from './common/footer/footer';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import { BrowserRouter as Switch, Route, withRouter, Router, Link  } from "react-router-dom";
import PrivateRoute from './common/privateRoute/privateRoute';
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import Home from './components/home/home';
import Profile from './components/profile/profile';
import notfound from './components/notfound/notfound';
import MyBookings from './components/mybookings/mybookings';
import BookingForm from './components/booking/booking';
import AddDog from './components/dogs/adddog';

class App extends Component {

  constructor(props) {
    super(props);
    this.state= {
      'userId': localStorage.getItem('userId')
    }
  }

  static getDerivedStateFromProps(props, state){
    if (localStorage.getItem('userId')) {
      return {
        'userId':localStorage.getItem('userId')
      }
    }
    return null;
  }

  logout = async() => { 
    await this.setState({'userId':null});
    this.props.history.push('/');
  }

  linkClick = async(linkData) => { 
    this.props.history.push(linkData.path);
    window.location.reload();
  }

  render() {
    return (
      <div className="App">
      {this.state.userId ? <Header userId={this.state.userId} linkClick={this.linkClick.bind(this)} logout={this.logout.bind(this)}/> : null }
      <Switch>
            <PrivateRoute path="/home" exact component={ Home }/>
            <PrivateRoute path="/profile" component={ Profile }/>
            <Route path="/signup" component={ SignUp }/>
            <Route path="/login" component={ Login }/>
            <PrivateRoute path="/mybookings" component={ MyBookings }/>
            <PrivateRoute path="/booking" component={ BookingForm }/>
            <PrivateRoute path="/adddog" component={ AddDog }/>
            <Route path="/" exact component={this.state.userId ? Home: Login }/>
      </Switch>
      {<Footer/>}
      </div>
    );
  }
}

// <Route component={notfound} />

export default withRouter(App);
