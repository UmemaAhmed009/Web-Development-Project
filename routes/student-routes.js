const express = require('express')
const {signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken} = require("../helpers/jwt_helpers")
const router = express.Router()

// importing student schema
const Student = require("../models/student");

//GET API
<<<<<<< HEAD
router.get('/',async(req,res) =>{
=======
router.get('/',verifyAccessToken,async(req,res) =>{
>>>>>>> 11c7a6b86cdfe6459429c699aad1ca31311acd0b
    try{
        //console.log(req.headers['authorization'])
        const students =  await Student.find()
        res.json(students)
    }
    catch(err){
        res.send('Error ' + err)
    }
})

//GET STUDENT BY ID API
router.get('/:id',verifyAccessToken,async(req,res) =>{
    try{
        const students =  await Student.findById(req.params.id)
        res.json(students)
    }
    catch(err){
        res.send("Error found getting student by ID " + err)
    }
})
//PUT API
router.put('/:id',verifyAccessToken, async(req,res) =>{
    try{
        const students = await Student.findById(req.params.id)
        students.name = req.body.name
        students.age= req.body.age
        const c1 = await students.save()
        res.json(c1)
    }
    catch(err){
        res.send('Error on put in class schema')
    }
})
//POST API
router.post('/',verifyAccessToken, async(req,res) => {
    const students = new Student({
        _id: req.body._id,
        name: req.body.name,
        age: req.body.age
    })
    try{
        const c1 = await students.save()
        res.json(c1)
    }catch(err){
        res.send('Error on creating student' + err)
    }

})
//DELETE API
router.delete('/:id',verifyAccessToken,async(req,res) =>{
    try{
        const students = await Student.findById(req.params.id)
<<<<<<< HEAD
        //students.name = req.body.name
        //students.age= req.body.age
=======
        students.name = req.body.name,
        students.age= req.body.age
>>>>>>> 11c7a6b86cdfe6459429c699aad1ca31311acd0b
        const c1 = await students.remove()
        res.json(c1)
    }
    catch(err){
        res.send('Error on deleting class')
    }
}) 
module.exports = router