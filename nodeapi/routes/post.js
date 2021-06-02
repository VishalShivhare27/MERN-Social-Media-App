 const express = require('express')
 const {getPosts,createPost, postsByUser,singlePost,
     postById,isPoster,deletePost,photo, updatePost,like,unlike,comment,uncomment} = require('../controllers/post')
 const {createPostValidator} = require('../validator')
const {requireSignin} = require('../controllers/auth')
const {userById} = require('../controllers/user')


 const router = express.Router()

//handling get request of post
 router.get('/posts',getPosts)

 router.put('/post/like',requireSignin,like)

 router.put('/post/unlike',requireSignin,unlike)

 //comments
 router.put('/post/comment',requireSignin,comment)

 router.put('/post/uncomment',requireSignin,uncomment)

 router.post("/post/new/:userId",
 requireSignin,
 createPost,
 createPostValidator)

 router.get("/posts/by/:userId",requireSignin,postsByUser)
 router.get('/post/:postId',singlePost)
 router.put('/post/:postId',requireSignin,isPoster,updatePost)
router.delete('/post/:postId',requireSignin,isPoster,deletePost)

router.get("/post/photo/:postId",photo)

//like unlike


 //any route containing userid our api will first execute userByID()
router.param("userId",userById)
//any time there is :postid in url this will fire and give us the post in req 
router.param("postId",postById)

module.exports = router;