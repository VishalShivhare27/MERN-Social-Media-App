import React, { Component } from 'react';
import {singlePost,update} from './apiPost'
import {isAuthenticated} from '../auth'
import { Redirect } from 'react-router-dom';
import DefaultPost from '../images/mountain.png'

class EditPost extends Component {
  constructor() {
    super();
    this.state = { 
        id: '',
        title: '',
        body: '',
        redirectToProfile: false,
        error: '',
        fileSize: 0,
        loading: false

      };
  }

  init = (postId) => {
   
    singlePost( postId)
    .then(data =>
         {
      if(data.error) {
        this.setState({redirectToProfile : true})
      } else {
        this.setState({
            id:data._id,
            title:data.title,
            body:data.body,
            error:'',
        })
        
      }
    })
  }
  
  componentDidMount() {
    this.postData = new FormData()
      //get user id from params
      const postId = this.props.match.params.postId
      this.init(postId)
  }

  isValid = () => {
    const { title, body, fileSize } = this.state;
    if (fileSize > 100000) {
      this.setState({
        error: "fileSize should be less than 1 mb",
        loading: false,
      });
      return false;
    }

    if (title.length === 0 || body.length === 0) {
      this.setState({ error: "All fields are Required", loading: false });
      return false;
    }

    return true;
  };

  
handleChange = (name) => (event) => {
    this.setState({error : ""})
    const value = name === 'photo' ? event.target.files[0] : event.target.value
  
    const fileSize = name === 'photo' ? event.target.files[0].size : 0
    this.postData.set(name,value)
   this.setState({[name] : value,fileSize})
  }
  
  clickSubmit = (event) => {
    event.preventDefault()
    this.setState({loading:true})
  
  
  
  
      if(this.isValid()) {
      
        //console.log(user)
        const postId = this.state.id
        const token = isAuthenticated().token
  
        update(postId,token,this.postData)
        .then(data => {
          if(data.error) 
          this.setState({error: data.error})
          else
          this.setState({
            loading: false,
            title: "",
            body : "",
            photo: "",
            redirectToProfile : true
          })
        })
      }
  }

  render() {
      const {id,title,body,redirectToProfile,error,loading} = this.state

      if (redirectToProfile) {
        return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
      }

    return (
      <div className="container">
      <h2 className="mt-5 mb-5">{title}</h2>

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
          style={{height: "200px",width: "auto"}}
          className="img-thumbnail"
           src={`http://localhost:5001/post/photo/${id}`} alt={title}
          onError = {i => (i.target.src = `${DefaultPost}`)}/>

      <form>

<div className="form-group">
    <label className type="text-muted"> Post Photo</label>
    <input onChange={this.handleChange("photo")}
     type="file"
     accept="image/*"
      className="form-control"
      
      />
  </div>

  <div className="form-group">
    <label className type="text-muted">Title</label>
    <input onChange={this.handleChange("title")}
     type="text"
      className="form-control"
      value={title}
      />
  </div>

  <div className="form-group">
    <label className type="text-muted">Body</label>
    <input 
    onChange={this.handleChange("body")} 
    type="text" 
    className="form-control"
    value={body}
    />
  </div>

  <button onClick={this.clickSubmit} className="btn btn-raised btn-primary"> Update Post</button>
</form>
      </div>
    );
  }
}

export default EditPost;


