const express = require('express')
const {userById,allUsers, getUser, updateUser,deleteUser,userPhoto,addFollowing,
    addFollower,removeFollowing,removeFollower,findPeople
} = require('../controllers/user')
const {requireSignin} = require('../controllers/auth')

const router = express.Router()

router.put('/user/follow', requireSignin,addFollowing,addFollower)
router.put('/user/unfollow', requireSignin,removeFollowing,removeFollower)

//handling get request of post
router.get('/users',allUsers)
router.get("/user/:userId",requireSignin, getUser)
router.put("/user/:userId",requireSignin, updateUser)
router.delete("/user/:userId",requireSignin, deleteUser)

router.get("/user/photo/:userId",userPhoto)

//who to follow
router.get('/user/findpeople/:userId',requireSignin,findPeople)

//any route containing :userid our api will first execute userByID() and give us user
router.param("userId",userById)

module.exports = router;