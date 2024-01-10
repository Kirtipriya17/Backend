const express = require("express")
const { default: mongoose } = require("mongoose")
const users = require("./src/Models/users")
const { register, login, findUser } = require("./src/Controllers/authentication")
const cors = require("cors")
const { verifyToken } = require("./src/Middlewares")


const server = express()


server.use(express.json())
server.use(cors())
server.get("/",(req,res)=>{


//    res.send("Success")
    res.status(200).json({
        name:"kirti",
        age:4
    })
})
// server.post("/register",(req,res)=>{
//     const{ name, phoneNumber ,email } = req.body
//     const _user = new users(req.body)
// _user.save()
//console.log(req.body)
// })

server.post("/register",register)
server.post("/login",login)

server.get("/get-user",verifyToken,findUser)

server.listen("3000")

// for connecting database 
mongoose.connect("mongodb://localhost:27017/XYZ").then(()=>{
    console.log("Database Connected")
}).catch((error)=>{
    console.log(error)
})