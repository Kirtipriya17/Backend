const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const user = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    PhoneNo:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true   
    },
    hash_password:{
        type:String,
        required:true
    }
})

user.virtual("password").set(function(password){
    this.hash_password = bcrypt.hashSync(password,10)

})

user.methods = {
    authenticate : function(password){  //pass a function we are not creating a function just passing it
        return bcrypt.compareSync(password,this.hash_password)
    }
}
module.exports = mongoose.model("Users",user)

// {
//     "name": "Kirti",
//     "phoneNumber":9508042959,
//     "email":"kirtipriya1753@gmail.com"
    
// }