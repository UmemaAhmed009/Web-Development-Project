 //Import express
 const express = require('express')
 //Import mongoose
 const mongoose = require('mongoose')
 require('dotenv').config()

//const url = 'mongodb://127.0.0.1/AlienDBex'
 const url = 'mongodb://127.0.0.1/User'
//Initializa the app
 const app = express()

 mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true})
 const con = mongoose.connection

 con.on('open', () =>{
    console.log('Mongodb is connected...')
 })

 app.use(express.json())

 /*const alienRouter=require('./routes/aliens')
 app.use('/aliens',alienRouter)*/

 //Using User routes
 const userRouter=require('./routes/users')
 app.use('/users',userRouter)
 //Using Subject Routes
 const subjectRouter=require('./routes/subject-routes')
 app.use('/subject',subjectRouter)
 //Using Class Routes
 const classRouter=require('./routes/class-routes')
 app.use('/class',classRouter)
 //Using Unit Routes
 const unitRouter=require('./routes/unit-routes')
 app.use('/unit',unitRouter)
 //Using Lesson Routes
 const lessonRouter=require('./routes/lesson-routes')
 app.use('/lesson',lessonRouter)
 //Using Question Routes
 const questionRouter=require('./routes/question-routes')
 app.use('/question',questionRouter)
 //Using Leaderboard Routes
 const leaderboardRouter=require('./routes/leaderboard-routes')
 app.use('/leaderboard',leaderboardRouter)
 //Using Student Routes
 const studentRouter=require('./routes/student-routes')
 app.use('/student',studentRouter)
 //Using User Role Routes
 const userRoleRouter=require('./routes/user_role-routes')
 app.use('/user_role',userRoleRouter)
 //Using Progress Routes
 const progressRouter=require('./routes/progress-routes')
 app.use('/progress',progressRouter)
 //Using Role Routes
 const roleRouter=require('./routes/role')
 app.use('/role',roleRouter)

 app.listen(3000, () =>{
    console.log('Server started...')
 })