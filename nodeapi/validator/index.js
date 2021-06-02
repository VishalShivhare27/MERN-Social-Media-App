exports.createPostValidator = (req,res,next) => {
    //title
    req.check('title',"Write a title").notEmpty()
    req.check('title', 'Title must be b/w 4 to 150 characters').isLength({
        min:4,
        max:150
    });

        //body
        req.check('body',"Write a body").notEmpty()
        req.check('body', 'body must be b/w 4 to 2000 characters').isLength({
            min:4,
            max:2000
        });

        //check for errors
        const errors = req.validationErrors()

        if(errors){
            const firstError = errors.map((error) => error.msg)[0]
            return res.status(400).json({error: firstError})
        }
        //proceed to next
        next();
}

exports.userSignupValidator = (req,res,next) => {
    //name is not null and b/w 4-10 characters
    req.check("name","Name is required").notEmpty();

    //email is not null valid and normalized
    req.check("email", "Email must be between 3 to 32 characters")
    .matches(/.+@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min: 4,
        max:2000
    })

    //check password
    req.check("password","password is required").notEmpty();
    req.check('password')
    .isLength({min: 6})
    .withMessage("Password must contaon atleast 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number")

            //check for errors
            const errors = req.validationErrors()

            if(errors){
                const firstError = errors.map((error) => error.msg)[0]
                return res.status(400).json({error: firstError})
            }
            //proceed to next
            next();
}