import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from "../auth"

const isActive = (history,path) => {
    if(history.location.pathname === path) return {color : "#ff9900"}
    else return {color: "#ffffff"}
}



const Menu = ({ history }) => (
  <div>
    <ul class="nav nav-tabs bg-info">
      <li class="nav-item">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
          Home
        </Link>
      </li>

      <li class="nav-item">
        <Link className="nav-link" style={isActive(history, "/users")} to="/users">
          Users
        </Link>
      </li>

      {!isAuthenticated() && (
        <>
          <li class="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
            >
              Sign In
            </Link>
          </li>
          <li class="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              Sign Up
            </Link>
          </li>
        </>
      )}

      {isAuthenticated() && (
          <>


        <li class="nav-item">

    <Link className="nav-link" to ={`/findpeople`}
     
     style={isActive(history, `/findpeople`)}
     >
  Find People
  </Link>
</li>

<li class="nav-item">

<Link className="nav-link" to ={`/post/create`}
 
 style={isActive(history, `/post/create`)}
 >
Create Post
</Link>
</li>

<li class="nav-item">

    <Link className="nav-link" to ={`/user/${isAuthenticated().user._id}`}
     
     style={isActive(history, `/user/${isAuthenticated().user._id}`)}
     >
  {`${isAuthenticated().user.name}'s profile`}
  </Link>
</li>

<li class="nav-item">
          <span
            onClick={() => signout(() => history.push("/"))}
            className="nav-link"
            style={
              (isActive(history, "/signup"),
              { cursor: "pointer", color: "#fff" })
            }
          >
            Sign Out
          </span>
        </li>
</>
      )}
    </ul>
  </div>
);

export default withRouter(Menu)


