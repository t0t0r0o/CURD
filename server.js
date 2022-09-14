const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const PORT = 4000;
const mongoose = require('mongoose');
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users");

dotenv.config();
mongoose.connect(
    process.env.MONGO_URL,
    async(err)=>{
        if(err) throw err;
        console.log("conncted to db")
    }
)

app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use("/api/auth",authRoute)
app.use("/api/users" , userRoute);


app.listen(PORT, function(){
    console.log('Server is running on Port:',PORT);
});