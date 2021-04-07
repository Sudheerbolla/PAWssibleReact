import React, { Component } from 'react';
import { fetchDogsByUser, fetchDogs } from '../../services/services';
// import { Card } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import $ from 'jquery';

class Home extends Component {

    constructor(props){
      super(props)
      this.state = {
          dogs:[]
      };
    }

   async componentDidMount() {
        if (window.history && window.history.pushState) {
            $(window).on('popstate', () => {
                if(localStorage.getItem('userId')){
                    this.props.history.push('/home')
                }		 
            });
        }
        var result = {}
        if(localStorage.getItem('userType') && localStorage.getItem('userType').toLowerCase() =="o") {
            result = await fetchDogsByUser(localStorage.getItem('userId'));
        } else {
            result = await fetchDogs();
        }
        console.log(JSON.stringify(result))
        if(result) {
            this.setState({dogs:result.dogs});
        }    
   }

    render(){
        return (
        <div className="section light-bg" id="features">
            <div className="container">
                <div className="section-title text-left">
                    <h3>Pets List</h3>
                </div>
                <div className="row">
                {this.state.dogs.map((data,index)=> {
                    return ( 
                        <div className="col-12 col-lg-4 col-sm-6" key={index}>
                    <div className="card features">
                        <div className="card-body" key={data._id}>
                            <div className="media">
                                <img width = '100px' height ='100px' className="mt-3" resizemode = 'fitXY' src={ data.photo }/>
                                <div className="media-body" style={{'minHeight': '138px'}}>
                                    <h3 className="card-title ml-4">{data.breedname}</h3>
                                </div>
                            </div>
                            <div className="text-right">
                            </div>
                        </div>
                    </div>
                </div>
                )
                })}
                </div>
                </div>
                <br />
            </div>
        );
    }
// <Link to={`${data.url}/${data.id}`} className="btn btn-success btn-sm my-3 my-sm-0 ml-lg-3">Book Online</Link>
                            
}

export default Home ;
