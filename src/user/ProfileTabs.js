import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import DefaultProfile from '../images/avatar.png'

class ProfileTabs extends Component {
  constructor(props) {
    super(props);
    this.state = { variable: 0 };
  }

  render() {
      const {following,followers,posts} = this.props
    return (
      <div className="row">
        <div className="col-md-4">
          <h3 className="text-primary">Followers</h3>
          <hr />
          {followers.map((person, i) => {
            return (
              <div key={i}>
                
                  <div>
                    <Link to={`/user/${person._id}`}>
                      <img
                      style={{borderRadius: "50%",
                    border: "1px solid black"}}
                        className="float-left mr-2"
                        height="30px"
                        width="30px"
                        src={`http://localhost:5001/user/photo/${person._id}`}
                        alt="user.name"
                        onError={(i) => (i.target.src = `${DefaultProfile}`)}
                      />
                      <div>
                        <p className="lead">{person.name}</p>
                      </div>
                    </Link>
                  </div>
                
              </div>
            );
          })}
        </div>

        <div className="col-md-4">
          <h3 className="text-primary">Following</h3>
          <hr />
          {following.map((person, i) => {
            return (
              <div key={i}>
               
                  <div>
                    <Link to={`/user/${person._id}`}>
                    <img
                      style={{borderRadius: "50%",
                    border: "1px solid black"}}
                        className="float-left mr-2"
                        height="30px"
                        width="30px"
                        src={`http://localhost:5001/user/photo/${person._id}`}
                        alt="user.name"
                        onError={(i) => (i.target.src = `${DefaultProfile}`)}
                      />
                      <div>
                        <p className="lead">{person.name}</p>
                      </div>
                    </Link>
                  </div>
                
              </div>
            );
          })}
        </div>

        <div className="col-md-4">
          <h3 className="text-primary">Posts</h3>
          <hr />
          {posts.map((post, i) => {
            return (
              <div key={i}>
               
                  <div>
                    <Link to={`/post/${post._id}`}>
                      <div>
                        <p className="lead">{post.title}</p>
                      </div>
                    </Link>
                  </div>
                
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProfileTabs;

