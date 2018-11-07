const express = require('express');
const UserRouter = express.Router();

const UserModel = require('../models/userModel')
UserRouter.use((req, res, next) => {
    console.log("User middleware");
    next();
});

UserRouter.get("/", (req, res) => {
    UserModel.find({},"-password", (err, users) => {
        if (err) res.status(500).json({ success: 0, error: err })
        else res.json({ success: 1, users });
    })
});

UserRouter.get("/:id", (req, res) => {
    let userId = req.params.id;
    UserModel.findById(userId, (err, userFound) => {
        if(err) res.status(500).json({ success: 0, message: err })
        else if(!userFound._id) res.status(404).json({ success: 0, message: "Not Found"})
        else res.json({ success: 1, user: userFound})
    })
});

UserRouter.post("/", (req, res) => {
    const { name, email, password, avatar, intro } = req.body;
    UserModel.create({ name, email, password, avatar, intro }, (err, userCreated) => {
        if(err) res.status(500).json({ success:0, message: err})
        else res.status(201).json({ success: 1, user: userCreated})
    })
});

UserRouter.put("/:id", (req, res) =>{
    let userId = req.params.id;
    const { name, password, avatar, intro} = req.body;
    // UserModel.findByIdAndUpdate(userId, {name ,password, avatar, intro},{new: true}, (req, userUpdated) =>{
    //     if(err) res.status(500).json({ success:0, message: err})
    //     else res.status(201).json({ success: 1, user: userUpdated})
    // })

    UserModel.findById(userId, (err, userFound)=>{
        if(err) res.status(500).json({ success: 0, message: err })
        else if(!userFound._id) res.status(404).json({ success: 0, message: "Not Found"})
        // else userFound.name = name || userFound.name;
        //      userFound.password = password || userFound.password;
        //      userFound.intro = intro || userFound.intro;
        //      userFound.avatar = avatar || userFound.avatar;
        else {
            for(key in { name, password, avatar, intro }) {
                if(userFound[key] && req.body[key]) userFound[key] = req.body[key];
            }
        }
        userFound.save((err, userUpdated)=>{
            if(err) res.status(500).json({ success:0, message: err})
            else res.status(201).json({ success: 1, user: userUpdated})
        })
    })
})

    UserRouter.delete("/:id", (req, res) =>{
        const userId = req.params.id;
        UserModel.remove(userId, (err)=>{
            if (err) res.status(500).json({success: 0, message: err})
            else res.json({success: 1})
        })
    })
module.exports = UserRouter;