import React, { Component } from 'react';
import { createBooking } from '../../services/services';
import DateTimePicker from 'react-datetime-picker'

class BookingForm extends Component {

    constructor(props) {
        super(props);
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        this.state = {
            dog: {},
            hours: '',
            subTotal: '',
            tax: '',
            grandTotal: '',
            timestamp: tomorrow,
            customerId: localStorage.getItem('userId')
        }
    }

    componentDidMount() {
        if(this.props.location.state && this.props.location.state.dog) {
            var dog = this.props.location.state.dog;
            this.setState({
                dog: dog
            });
        }
    }

    createBooking = async (e) => {
        e.preventDefault();
        if (this.state.timestamp && this.state.hours) {
            var requestBody = {
                dogId: this.state.dog._id,
                ownerId: this.state.dog.ownerId,
                customerId: this.state.customerId,
                hours: this.state.hours,
                total: this.state.grandTotal,
                timestamp: this.state.timestamp,
                status: 'R'
            };
            var res = await createBooking(requestBody);
            if (res) {
                this.props.history.push({
                    pathname: '/'
                })
            }
        }
    }

    onChangeField = (event) => {
        const hrs = event.target.value;
        const price = this.state.dog.hourlyPrice;
        const subTotal = hrs * price;
        const tax = 0.12 * subTotal;
        const grandTotal = subTotal + tax;
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
            subTotal:subTotal,
            tax:tax,
            grandTotal:grandTotal
        });
    }

    roundToTwo(num) {
        if(num)
            return +(Math.round(num + "e+2")  + "e-2");
        else return 0.0;
    }

    dateChange = (date) => {
        this.setState({
            timestamp: date
        });
    }

    render() {
        return (
            <div className="login-wrapper">
                <div className="col-sm-14 login">
                <div className="card-header">
                    <h5>Create Booking</h5>
                </div>
                <div className="card-body">
                <h5>{this.state.dog.breedname}</h5>
                    <div className="row justify-content-sm-center">
                    <div className="col-md-9">
                        <form className="form-signin">
                        <img width = '250px' height ='250px' className="mt-3" resizemode = 'fitXY' src={ this.state.dog.photo }/>
                        <p>{"Hourly Price: $ "+this.state.dog.hourlyPrice}</p>
                        <input type="number" className="form-control mb-3" 
                        placeholder="Enter No Of Hours" name="hours" value={this.state.hours} onChange={this.onChangeField} />
                            <DateTimePicker
                                minDate={new Date()}
                                onChange={this.dateChange}
                                value={this.state.timestamp}
                            />   
                            <div className="row">
                                <div className="col-md-3 mt-2">
                                SubTotal: 
                                </div>
                                <div className="col-md-8">
                                {"$ " + this.roundToTwo(this.state.subTotal)}
                                </div>
                            </div>
                                <div className="row">
                                <div className="col-md-3 mt-2">
                                Tax: 
                                </div>
                                <div className="col-md-8">
                                {"$ " + this.roundToTwo(this.state.tax)}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 mt-2">
                                Grand Total: 
                                </div>
                                <div className="col-md-8">
                                {"$ " + this.roundToTwo(this.state.grandTotal)}
                                </div>
                            </div>
                        
                            <button type="submit" onClick={this.createBooking} className="btn btn-primary btn-block">Create Booking</button>                  
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }

    }

export default BookingForm;
