import React, { Component } from 'react';
import { fetchBookings, changeBookingStatus } from '../../services/services';

class MyBookings extends Component {

    constructor(props) {
      super(props)
      this.state = {
          isOwner:localStorage.getItem('userType') && localStorage.getItem('userType').toLowerCase() =="o",
          bookings:[]
      };
    }

   async componentDidMount() {
       this.callBookingsAPI();
   }

   async callBookingsAPI() {
        var result = await fetchBookings(this.state.isOwner, localStorage.getItem('userId'));
        console.log(JSON.stringify(result))
        if(result) {
            this.setState({bookings:result.bookings});
        }    
   }

   acceptBooking = async (e) => {
        e.preventDefault();
        const { param } = e.target.dataset;
        var obj = JSON.parse(param);
        var res = await changeBookingStatus(obj.id, obj.status);
        if(res) {
            this.callBookingsAPI();
        }
   }

   // status - R - requested, X - cancelled, C - Completed, P - Accepted
   renderElement(status, id) {
       if(this.state.isOwner) {
        if(status==="p" || status==="P") {
            return <div>
                <p className="card-title ml-4">{"Booking Status: Accepted/In Progress"}</p>
                <div className="container">
                <div className="row">
                    <div className="col-sm">
                    <button type="submit" data-param={JSON.stringify({status:"C", id:id})} onClick={this.acceptBooking} className="btn btn-primary" >
                        Complete
                    </button>
                    </div>
                    <div className="col-sm">
                    <button type="submit" data-param={JSON.stringify({status:"X", id:id})} onClick={this.acceptBooking} className="btn btn-primary" >
                        Reject
                    </button>
                    </div>
                </div>
                </div>
                </div>;
        } else if(status==="r" || status==="R") {
            return <div>
            <p className="card-title ml-4">{"Booking Status: Accepted/In Progress"}</p>
            <div className="container">
            <div className="row">
                <div className="col-sm">
                <button type="submit" data-param={JSON.stringify({status:"P", id:id})} onClick={this.acceptBooking} className="btn btn-primary" >
                    Confirm
                </button>
                </div>
                <div className="col-sm">
                <button type="submit" data-param={JSON.stringify({status:"X", id:id})} onClick={this.acceptBooking} className="btn btn-primary" >
                    Reject
                </button>
                </div>
            </div>
            </div>
                </div>;
        } else if(status==="x" || status==="X") {
            return <p className="card-title ml-4">{"Booking Status: Cancelled/Rejected"}</p>;
        } else {
            return <p className="card-title ml-4">{"Booking Status: Completed"}</p>;
        }    
       } else {
        if(status==="p" || status==="P") {
            return <div>
                <p className="card-title ml-4">{"Booking Status: Accepted/In Progress"}</p>
                    <button type="submit" data-param={JSON.stringify({status:"C", id:id})} onClick={this.acceptBooking} className="btn btn-primary" >
                        Complete
                    </button>
                </div>;
        } else if(status==="r" || status==="R") {
            return <div>
                <p className="card-title ml-4">{"Booking Status: Accepted/In Progress"}</p>
                    <button type="submit" data-param={JSON.stringify({status:"X", id:id})} onClick={this.acceptBooking} className="btn btn-primary" >
                        Cancel Request
                    </button>
                </div>;
        } else if(status==="x" || status==="X") {
            return <p className="card-title ml-4">{"Booking Status: Cancelled/Rejected"}</p>;
        } else {
            return <p className="card-title ml-4">{"Booking Status: Completed"}</p>;
        }    
       }
   }

    render() {
        return (
        <div className="section light-bg" id="features">
            <div className="container">
                <div className="section-title text-left">
                    <h3>My Bookings</h3>
                </div>
                <div className="row">
                {this.state.bookings.map((data, index)=> {
                    return ( 
                        <div className="col-12 col-lg-4 col-sm-6" key={index}>
                    <div className="card features">
                        <div className="card-body" key={data.id}>
                            <div className="media">
                                <div className="media-body" style={{'minHeight': '138px'}}>
                                    <p className="card-title ml-4">{"Dog: "+ data.dog.breedname}</p>
                                    <img width = '100px' height ='100px' className="mt-3" resizemode = 'fitXY' src={ data.dog.photo }/>
                                    <p className="card-title ml-4">{"Owner Name: "+ data.owner.name}</p>
                                    <p className="card-title ml-4">{"Owner Email: "+ data.owner.email}</p>
                                    <p className="card-title ml-4">{"Customer Name: "+ data.customer.name}</p>
                                    <p className="card-title ml-4">{"Customer Email: "+ data.customer.email}</p>
                                    <p className="card-title ml-4">{"Bookings Hours: "+ data.hours}</p>
                                    <p className="card-title ml-4">{"Time: "+ data.timestamp}</p>
                                    { this.renderElement(data.status, data.id) }
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
                            
}

export default MyBookings;
