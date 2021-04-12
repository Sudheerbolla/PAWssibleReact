import React, { Component } from 'react';
import { addDog, changeDogStatus, updateDog } from '../../services/services';

class AddDog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEdit:false,
            id:'',
            breedname: '',
            description: '',
            allergies: '',
            likes: '',
            disLikes: '',
            ageInMonths: '',
            hourlyPrice:'',
            photo: '',
            active: true,
            ownerId: localStorage.getItem('userId')
        }
    }

    componentDidMount() {
        if(this.props.location.state && this.props.location.state.dog) {
            var dog = this.props.location.state.dog;
            this.setState({
                isEdit: true,
                id: dog._id,
                breedname: dog.breedname,
                description: dog.description,
                allergies: dog.allergies,
                likes: dog.likes,
                disLikes: dog.disLikes,
                ageInMonths: dog.ageInMonths,
                hourlyPrice: dog.hourlyPrice,
                photo: dog.photo,
                active: dog.active
            });
        }
    }

    addDog = async (e) => {
        e.preventDefault();
        if (this.state.breedname && this.state.ageInMonths && this.state.hourlyPrice) {
            var requestBody = {
                breedname: this.state.breedname,
                description: this.state.description,
                allergies: this.state.allergies,
                likes: this.state.likes,
                disLikes: this.state.disLikes,
                ageInMonths: this.state.ageInMonths,
                hourlyPrice: this.state.hourlyPrice,
                photo: this.state.photo,
                active: this.state.active,
                ownerId: this.state.ownerId
            };
            if(this.state.isEdit) {
                requestBody.dogId = this.state.id;
                var res = await updateDog(requestBody);
            } else {
                var res = await addDog(requestBody);
            }
            if (res) {
                this.props.history.push({
                    pathname: '/'
                })
            }
        }
    }

    updateDogStatus = async (e) => {
        e.preventDefault();
        var requestBody = {
            dogId: this.state.id,
            active: !this.state.active
        };
        var res = await changeDogStatus(requestBody);
        if (res) {
            this.props.history.push({
                pathname: '/'
            })
        }
    }

  onChangeField = (event) => {
    this.setState({
        ...this.state,
        [event.target.name]: event.target.value
      });
  }

  render() {
    return (
      <div className="login-wrapper">
        <div className="col-sm-14 login">
          <div className="card-header"><h5>{this.state.isEdit ? "Edit Dog" : "Add Dog" }</h5></div>
          <div className="card-body">
            <div className="row justify-content-sm-center">
              <div className="col-md-9">
                <form className="form-signin" >
                  <img width = '250px' height ='250px' className="mt-3" resizemode = 'fitXY' src={ this.state.photo }/>
                  <input type="text" className="form-control mb-3" 
                  placeholder="Enter Breed Name" name="breedname" value={this.state.breedname} onChange={this.onChangeField} />
                  <input type="text" className="form-control mb-3" 
                  placeholder="Describe your pet" name="description" value={this.state.description} onChange={this.onChangeField} />
                  <input type="text" className="form-control mb-3" placeholder="Enter Likes"
                   name="likes" value={this.state.likes} onChange={this.onChangeField} />
                  <input type="text" className="form-control mb-3" placeholder="Enter DisLikes" 
                  name="disLikes" value={this.state.disLikes} onChange={this.onChangeField} />
                  <input type="text" className="form-control mb-3" placeholder="Enter Allergies" 
                  name="Allergies" value={this.state.allergies} onChange={this.onChangeField} />
                  <input type="number" className="form-control mb-3" placeholder="Enter Age In Months" 
                  name="ageInMonths" value={this.state.ageInMonths} onChange={this.onChangeField} />
                  <input type="number" className="form-control mb-3" placeholder="Enter Price Per Hour" 
                  name="hourlyPrice" value={this.state.hourlyPrice} onChange={this.onChangeField} />
                  <input type="text" className="form-control mb-3" placeholder="Enter Photo URL" 
                  name="photo" value={this.state.photo} onChange={this.onChangeField} />
                  {
                    this.state.isEdit ?
                    <div className="container">
                    <div className="row">
                        <div className="col-sm">
                        <button type="submit" onClick={this.addDog} className="btn btn-primary btn-block">Update</button>
                        </div>
                        <div className="col-sm">
                        <button type="submit" onClick={this.updateDogStatus} className="btn btn-primary btn-block">{this.state.active?"De-Activate":"Activate"}</button>  
                        </div>
                    </div>
                    </div> : 
                    <div>
                        <button type="submit" onClick={this.addDog} className="btn btn-primary btn-block">Add Dog</button>                  
                    </div>  
                  }
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default AddDog;
