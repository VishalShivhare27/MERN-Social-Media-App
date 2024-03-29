import React, { Component } from 'react';
import {isAuthenticated} from '../auth'
import {remove} from './apiUser'
import {signout} from "../auth"
import { Redirect } from 'react-router-dom';

class DeleteUser extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { variable: 0 };
//   }

state = {
    redirect: false
}
deleteAccount =() => {
    const token = isAuthenticated().token
    const userId = this.props.userId
    remove(userId,token)
    .then(data => {
        if(data.error) {
            console.log(data.error)
        } else {
            //signout and redirect
            signout(() => console.log("user is deleted"))

            this.setState({
                redirect:true
            })

        }
    })
}

deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete your account?")
    if(answer) {
        this.deleteAccount()
    }
}

  render() {
      if(this.state.redirect){
          return <Redirect to="/"></Redirect>
      }
    return (
        <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">Delete Profile</button>
    );
  }
}

export default DeleteUser;

