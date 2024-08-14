const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel")
//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!!!");
    }

    const userAvailable = await User.findOne({email});

    if(userAvailable){
        res.status(400);
        throw new Error("User already registered!!!");
    }

    //Hash password

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassowrd", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`User created ${user}`);
    if(user){
        res.status(200).json({_id: user.id, email: user.email});
    }else{
        res.status(400);
        throw new Error("User data is not Valid");
    }
    // res.json({message: "Register the user"});
    
    // const alumnis = await Alumni.find();
    // res.status(200).json(alumnis);

    // console.log("The request body is: ", req.body);
    // const {name, email, phone} = req.body;
    // if(!name || !email || !phone){
    //     res.status(400);
    //     throw new Error("All fields are mandatory");
    // }
    // res.status(200).json({message: "Get All Alumis"});    
});

//@desc Login user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res)=>{
     const {email, password} = req.body;
    console.log(email, password);
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({email});
    //compare password with hashedPassword
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
    );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
    // res.json({message: "login user"});
});


//@desc Current user
//@route POST /api/users/current
//@access public

const currentUser = asyncHandler(async (req, res)=>{
    res.json(req.user); 
});

module.exports = {registerUser, loginUser, currentUser};