const express = require('express')
const {signup,signin, signout} = require('../controllers/auth')
const {userById} = require('../controllers/user')

const {userSignupValidator} = require('../validator')
const router = express.Router()

//handling get request of post
router.post("/signup",userSignupValidator,signup)
router.post("/signin",signin)
router.get("/signout",signout);

//any route containing userid our api will first execute userByID()
router.param("userId",userById)

module.exports = router;