import React, { Component } from 'react';
import { fetchDogsByUser, fetchDogs } from '../../services/services';
import $ from 'jquery';

class Home extends Component {

    constructor(props){
      super(props)
      this.state = {
          dogs:[],
          isOwner : localStorage.getItem('userType') && localStorage.getItem('userType').toLowerCase() =="o",
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
        if(this.state.isOwner) {
            result = await fetchDogsByUser(localStorage.getItem('userId'));
        } else {
            result = await fetchDogs();
        }
        if(result) {
            this.setState({dogs:result.dogs});
        }    
   }

    proceedBooking = async (e) => {
        e.preventDefault();
        const { param } = e.target.dataset;
        var obj = JSON.parse(param);
        if(this.state.isOwner) {
            this.props.history.push({
                pathname: '/adddog',
                state: { dog : obj } 
            })
        } else {
            this.props.history.push({
                pathname: '/booking',
                state: { dog : obj } 
            })
        }
    }

    render() {
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
                                <img width = '125px' height ='150px' className="mt-3" resizemode = 'fitXY' src={ data.photo }/>
                                <div className="media-body" style={{'minHeight': '138px'}}>
                                    <h5 className="card-title ml-4">{data.breedname}</h5>
                                    <p className="card-title ml-4">{data.description}</p>
                                    <p className="card-title ml-4">{"Likes: "+ data.likes}</p>
                                    <p className="card-title ml-4">{"DisLikes: "+ data.disLikes}</p>
                                    <p className="card-title ml-4">{"Allergies: "+ data.allergies}</p>
                                    <p className="card-title ml-4">{"Age In Months: "+ data.ageInMonths}</p>
                                    <h6 className="card-title ml-4">{"Hourly Price: $"+ data.hourlyPrice}</h6>
                                    <button type="submit" onClick={this.proceedBooking} data-param={JSON.stringify(data)} className="btn btn-primary btn-block">{this.state.isOwner?"Edit":"Book"}</button>
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
