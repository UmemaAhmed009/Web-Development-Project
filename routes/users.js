const express = require('express')
const bcrypt = require('bcryptjs')
//const jwt = require("jsonwebtoken");
const createError = require("http-errors")
//const { verifyAccessToken} = require("../helpers/jwt_helpers");
const {signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken} = require("../helpers/jwt_helpers")
const router = express.Router()
// importing user schema
const User = require("../models/user");
const { create } = require('../models/alien');

//REGISTER API
router.post("/register",async(req,res)=>{
    try{
        const { first_name, last_name, email, password } = req.body;

        //check if user already exists
        //Validate if user exists in our database
        const oldUser = await User.findOne({email});
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
          }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password,10);

        //Create user in our database
        const user = new User({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
          });
          const savedUser = await user.save()

        //Create token 
        /*const token = jwt.sign(
            {
                user_id: user._id, email},
                process.env.TOKEN_KEY,
                {
                    expiresIn :"2h",
                }
            ); */
            //save user token
            const accessToken = await signAccessToken(savedUser.id);
            const refreshToken = await signRefreshToken(savedUser.id);
            res.send(savedUser)
            // return new user
            //res.status(201).json(savedUser);
        }catch(err){
                console.log("Error found while registering user"+ err);
            }
});

//LOGIN API
router.post("/login", async(req,res)=>{
    try{
        //Get user input
        const{email,password} = req.body;

        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if(user && await bcrypt.compare(password, user.password))
        {

            //user
            const accessToken = await signAccessToken(user.id);
            const refreshToken = await signRefreshToken(user.id);
            res.send({accessToken, refreshToken});
            //res.status(200).json({accessToken});
        } 
        else{
            res.send("User not registered")
        }
    }
    catch(err){
        console.log("Error while logging" + err);
    }
})
//REFRESH-TOKEN API 
router.post('/refresh-token', async(req,res)=>{
    try {
        const { refreshToken } = req.body
        if(!refreshToken) throw createError.BadRequest()
        const userID = await verifyRefreshToken(refreshToken)

        const accessToken = await signAccessToken(userID)
        const refToken = await signRefreshToken(userID)
        res.send({accessToken: accessToken, refreshToken: refToken})
    } catch (error) {
        console.log("Error while generating refresh token" + err);
    }
})
router.get('/', verifyAccessToken, async(req,res) =>{
    try{
        //console.log(req.headers['authorization'])
        const users =  await User.find()
        res.status(200).send("Welcome 🙌 ");
        res.json(users)
    }
    catch(err){
        res.send('Error ' + err)
    }
})

//GET BY ID API
router.get('/:id',verifyAccessToken,async(req,res) =>{
    try{
        const users =  await User.findById(req.params.id)
        res.json(users)
    }
    catch(err){
        res.send("Error found getting user by ID " + err)
    }
})
//PUT API
router.put('/:id',verifyAccessToken, async(req,res) =>{
    try{
        const user = await User.findById(req.params.id)
        user.name = req.body.name
        const a1 = await user.save()
        res.json(a1)
    }
    catch(err){
        res.send('Error on put')
    }
})
//POST API
router.post('/', async(req,res) => {
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
    })
    try{
        const a1 = await user.save()
        res.json(a1)
    }catch(err){
        res.send('Error on post' + err)
    }

})
//DELETE API
router.delete('/:id',verifyAccessToken,async(req,res) =>{
    try{
        const user = await user.findById(req.params.id)
        user.email = req.body.email
        const a1 = await user.remove ()
        res.json(a1)
    }
    catch(err){
        res.send('Error on deleting')
    }
}) 
module.exports = router