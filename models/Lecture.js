const mongoose = require("mongoose");

const  LectureSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique:true},
        desc: {type: String},
        img: {type: String},
        video: {type: String},
        limit: {type: Number},
        isSeries:{type: Boolean,default:false}
    },
    {timestamps: true}
)

module.exports = mongoose.model("Lecture",LectureSchema)