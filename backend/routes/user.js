const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const router = express.Router();
const SECRET = "/backend/config.js"
const jwt = require("jsonwebtoken");
const {authMiddleware}  = require("./middleware");




const signupSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})



//singup and sigin routes
router.post("/signup", async (req, res)=>{
    const body = req.body;
    const { success } = signupSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            message: "Incorrect inputs"
        })
    } 
    
    const userExists = await User.findOne({
            username: req.body.username
        })
    
        
        if (userExists) {
            res.status(411).json({
                message: "Email already taken / Incorrect inputs"
            })
        }
        try {

        const createdUser = await User.create(body);
        const token = jwt.sign({
            userId : createdUser._id
        }, SECRET)

        await Account.create({
            userId: createdUser._id,
            balance: 1+ Math.random() *1000
            
        })

        return res.status(200).json({
            message: "User created successfully",
            token: token
        })
    }catch(error) {
        return res.status(500).json({
            error: "Internal Server Error!"
        })
    }


})

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

//singin route

router.post("/signin", async (req, res)=>{
    const body = req.body;
    const { success } = signinSchema.safeParse(body);
    if (!success) {
       return res.status(400).json({
            message: "Inputs are not correct!"
        })
    } 

    const existingUser = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(existingUser) {
        const token = jwt.sign({
            userId: existingUser._id
        }, SECRET);

        return res.status(200).json({
            token: token,
            email: req.body.username
        })
    }
    else {

    return res.status(411).json({
        message: "Username or Password is not right"
    })
}
})


const updateSchema = zod.object({
        password: zod.string().optional(),
        firstName: zod.string().optional(),
        lastName: zod.string().optional()
    })




router.put("/", authMiddleware, async (req, res)=>{
    const body = req.body;
    const { success } = updateSchema.safeParse(body);
    if (success) {
        await User.updateOne({
            _id: req.userId
        }, req.body)
    } else{
        return res.status(411).json({
            message: "Error while updating information"
        })
    }

    return res.json({
        message: "Updated successfully!"
    })

})



router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    return res.status(200).json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})





module.exports = router;