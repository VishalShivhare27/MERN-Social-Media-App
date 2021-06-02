import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {isAuthenticated} from '../auth'
import {read,update,updateUser} from './apiUser'
import DefaultProfile from '../images/avatar.png'



class EditProfile extends Component {
  constructor() {
    super();
    this.state = { 
      id: "",
      name: "",
      email:"",
      password: "",
      redirectToProfile:false,
      error:'',
      loading : false,
      fileSize : 0,
      about: ""
    };
  }

init = (userId) => {
  const token = isAuthenticated().token
  read( userId,token)
  .then(data => {
    if(data.error) {
      this.setState({redirectToProfile : true})
    } else {
      this.setState({id:data._id,name:data.name,email:data.email,error:'',about:data.about})
      
    }
  })
}

componentDidMount() {
  this.userData = new FormData()
    //get user id from params
    const userId = this.props.match.params.userId
    this.init(userId)
}

isValid = () => {
  const {name,email,password,fileSize} = this.state
  if(fileSize > 100000){
    this.setState({error: "fileSize should be less than 1 mb",loading:false})
    return false
  }

  if(name.length===0){
    this.setState({error: "Name is Required",loading:false})
    return false
  }
  if(email.length==0){
    this.setState({error: "Email is Required",loading:false})
    return false
  }
  if(password.length>=1 && password.length <=5){
    this.setState({error: "Password must be greater than 5 characters ",loading:false})
    return false
  }
  return true
}

handleChange = (name) => (event) => {
  this.setState({error : ""})
  const value = name === 'photo' ? event.target.files[0] : event.target.value

  const fileSize = name === 'photo' ? event.target.files[0].size : 0
  this.userData.set(name,value)
 this.setState({[name] : value,
fileSize})
}

clickSubmit = (event) => {
  event.preventDefault()
  this.setState({loading:true})




    if(this.isValid()) {
    
      //console.log(user)
      const userId = this.props.match.params.userId
      const token = isAuthenticated().token
      update(userId,token,this.userData)
      .then(data => {
        if(data.error) 
        this.setState({error: data.error})
        else
        updateUser(data,() => {
          this.setState({
            redirectToProfile:true
        })
        })

      })
    }
}

  render() {
    const {id,name,email,password,redirectToProfile,error,loading,about} = this.state

    if(redirectToProfile){
      return <Redirect to={`/user/${id}`} />
    }

    const photoUrl = id ? `http://localhost:5001/user/photo/${id}?${new Date().getTime()}`
    : {DefaultProfile}

    return (
      <div className="container">
        <h2 className="mt-5 mb-5"> Edit Profile</h2>

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}

        <img
          style={{ height: "200px", width: "auto" }}
          className="img-thumbnail"
          src={photoUrl}
          alt={name}
          onError={(i) => (i.target.src = `${DefaultProfile}`)}
        />

        <form>
          <div className="form-group">
            <label className type="text-muted">
              Profile Photo
            </label>
            <input
              onChange={this.handleChange("photo")}
              type="file"
              accept="image/*"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className type="text-muted">
              Name
            </label>
            <input
              onChange={this.handleChange("name")}
              type="text"
              className="form-control"
              value={name}
            />
          </div>
          <div className="form-group">
            <label className type="text-muted">
              Email
            </label>
            <input
              onChange={this.handleChange("email")}
              type="email"
              className="form-control"
              value={email}
            />
          </div>
          <div className="form-group">
            <label className type="text-muted">
              About
            </label>
            <input
              onChange={this.handleChange("about")}
              type="text"
              className="form-control"
              value={about}
            />
          </div>
          <div className="form-group">
            <label className type="text-muted">
              Password
            </label>
            <input
              onChange={this.handleChange("password")}
              type="password"
              className="form-control"
              value={password}
            />
          </div>

          <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-primary"
          >
            Update
          </button>
        </form>
      </div>
    );
  }
}

export default EditProfile;

