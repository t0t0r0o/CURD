const router = require("express").Router();
const User  =require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//REGISTER
router.post("/register", async (req,res) => {
    console.log(req.body);
    const usernameCheck = await User.findOne({ username: req.body.username })
    const emailCheck = await User.findOne({ email: req.body.email });
    const password = await User.findOne({ password: req.body.password });
  if(usernameCheck != null || emailCheck != null) {
    if(usernameCheck != null) {
      res.json("Username already exists")
    } else {
      res.json("Email already exists")
    }
  } else {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
        ).toString(),
        role: "user"
    })

    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
  }
});


//LOGIN
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      const { password, ...info } = user;
      !user && res.status(401).json("Wrong password or username!");
  
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
  
      originalPassword !== req.body.password &&
        res.status(401).json("Wrong password or username!");
  
      const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: "5d" }
      );

  
      res.status(200).json({ ...info, accessToken });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router

