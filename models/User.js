const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema(
    {
        "username": {type: String, required: true, unique:true},
        "email": {type:String,required:true,unique:true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/},
        "password": {type: String, required:true},
        "role": {type: String}
    },
    {timestamps:true}
)

module.exports = mongoose.model("User",UserSchema)