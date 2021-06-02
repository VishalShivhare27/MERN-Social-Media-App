import React from 'react'
import {Route,Switch} from 'react-router-dom'
import Home from './core/Home'
import Menu from './core/Menu';
import EditProfile from './user/EditProfile';
import FindPeople from './user/FindPeople';
import Profile from './user/Profile';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Users from './user/Users';
import NewPost from './post/NewPost';
import PrivateRoute from './auth/PrivateRoute'
import SinglePost from './post/SinglePost';
import EditPost from './post/EditPost';

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path ="/" component={Home}></Route>
            <PrivateRoute exact path ="/post/create" component={NewPost}></PrivateRoute>

            <Route exact path ="/post/:postId" component={SinglePost}></Route>
            <PrivateRoute exact path ="/post/edit/:postId" component={EditPost}></PrivateRoute>

            <Route exact path ="/users" component={Users}></Route>
            
            <Route exact path ="/signup" component={Signup}></Route>
            <Route exact path ="/signin" component={Signin}></Route>
            <PrivateRoute exact path ="/user/:userId" component={Profile}></PrivateRoute>
            <PrivateRoute exact path ="/user/edit/:userId" component={EditProfile}></PrivateRoute>
            <PrivateRoute exact path ="/findpeople" component={FindPeople}></PrivateRoute>


        </Switch>
    </div>
)

export default MainRouter;