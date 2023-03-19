const express = require('express')
const {signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken} = require("../helpers/jwt_helpers")
const router = express.Router()

// importing user_role schema
const User_Role = require("../models/user_role");

//GET API
router.get('/',async(req,res) =>{
    try{
        //console.log(req.headers['authorization'])
        const user_roles =  await User_Role.find()
        res.json(user_roles)
        //res.json("All user_roles are: " + user_roles)
    }
    catch(err){
        res.send('Error ' + err)
    }
})

//GET USER_ROLE BY ID API
router.get('/:id',verifyAccessToken,async(req,res) =>{
    try{
        const user_role =  await User_Role.findById(req.params.id)
        res.json(user_role)
    }
    catch(err){
        res.send("Error found getting user_role by ID " + err)
    }
})
//PUT API
router.put('/:id',verifyAccessToken, async(req,res) =>{
    try{
        const user_role = await User_Role.findById(req.params.id)
        user_role.user_role_name = req.body.user_role_name
        const u1 = await user_role.save()
        res.json(u1)
    }
    catch(err){
        res.send('Error on put')
    }
})
//POST API
router.post('/', async(req,res) => {
    const user_role = new User_Role({
        _id : req.body.user_role_id,
        user_id: req.body.user_id,
        role_id: req.body.role_id
    })
    try{
        const u1 = await user_role.save()
        res.json(u1)
    }catch(err){
        res.send('Error on creating user_role' + err)
    }

})
//DELETE API
router.delete('/:id',verifyAccessToken,async(req,res) =>{
    try{
        const user_role = await User_Role.findById(req.params.id)
        user_role_name = req.body.user_role_name
        const u1 = await user_role.remove ()
        res.json(u1)
    }
    catch(err){
        res.send('Error on deleting')
    }
}) 

module.exports = router