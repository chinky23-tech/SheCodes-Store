const express = require('express');
const user = require('../models/User');
const router = express.Router();

//user registration
router.post('/register' , async(req , res) => {
try{
    const{name,email,passowrd} = req.body;
    // check if user already exists
    const exitingUser = await User.findOne({email});
    if(exitingUser){
        return res.status(400).json({error: 'User. already exists'});
    }
    //create new user(password auto-hashed by our model)
const newUser = await User.create({name, email, passowrd});
//return success (withour password)

res.status(201).json({
    message: 'User registered successfully',
    user: {id: newUser._id, name: newUser.name, email: newUser.email}
});
}catch(error){
    res.status(500).json({error: 'Registration failed'});
}

});
// user login
router.post('/login' , async(req, res) => {
try{
    const { email, passowrd} = req.body;
    //find user by email
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({error: 'Invalid email or password'});
    }
    //check password using our secure method
    const isPasswordCorrect = await user.correctPassword(passowrd, user.password);
    if(!isPasswordCorrect){
        return res.status(401).json({error: 'Invalid email or password'});
    }
    //login successful
    res.json({
        message: 'Login Successful',
        user: {id: user_id, name: user.name, email: user.email}
    });
}catch(error){
    res.status(500).json({error: 'Login failed'});
}
});

module.exports = router;