 const express = require('express')
 const mongoose = require('mongoose')
 require('dotenv').config()
console.log(process.env) // remove this after you've confirmed it is working

 //const url = 'mongodb://127.0.0.1/AlienDBex'
 const url = 'mongodb://127.0.0.1/User'

 const app = express()

 mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true})
 const con = mongoose.connection

 con.on('open', () =>{
    console.log('connected...')
 })

 app.use(express.json())

 /*const alienRouter=require('./routes/aliens')
 app.use('/aliens',alienRouter)*/

 const userRouter=require('./routes/users')
 app.use('/users',userRouter)

 app.listen(9000, () =>{
    console.log('Server started')
 })