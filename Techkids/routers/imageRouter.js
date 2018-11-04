const express = require('express');
const ImageRouter = express.Router();

const ImageModel = require('../models/imageModel')
ImageRouter.use((req, res, next) => {
    console.log(" middleware");
    next();
});

ImageRouter.get("/", (req, res) => {
    ImageModel.find({}, (err, images) => {
        if (err) res.status(500).json({ success: 0, error: err })
        else res.json({ success: 1, images });
    })
});

ImageRouter.get("/:id", (req, res) => {
    let imageId = req.params.id;
    ImageModel.findById(imageId, (err, imageFound) => {
        if(err) res.status(500).json({ success: 0, message: err })
        else if(!imageFound._id) res.status(404).json({ success: 0, message: "Not Found"})
        else res.json({ success: 1, image: imageFound})
    })
});

ImageRouter.post("/", (req, res) => {
    const { name,  view, title, like, url, caption, comments } = req.body;
    ImageModel.create({ name, view, title, like, url, caption, comments }, (err, imageCreated) => {
        if(err) res.status(500).json({ success:0, message: err})
        else res.status(201).json({ success: 1, image: imageCreated})
    })
});

ImageRouter.put("/:id", (req, res) =>{
    let imageId = req.params.id;
    const { name, view, title, like, url, caption, comments} = req.body;
    // ImageModel.findByIdAndUpdate(imageId, {name ,password, avatar, intro},{new: true}, (req, imageUpdated) =>{
    //     if(err) res.status(500).json({ success:0, message: err})
    //     else res.status(201).json({ success: 1, image: imageUpdated})
    // })

    ImageModel.findById(imageId, (err, imageFound)=>{
        if(err) res.status(500).json({ success: 0, message: err })
        else if(!imageFound._id) res.status(404).json({ success: 0, message: "Not Found"})
        // else imageFound.name = name || imageFound.name;
        //      imageFound.password = password || imageFound.password;
        //      imageFound.intro = intro || imageFound.intro;
        //      imageFound.avatar = avatar || imageFound.avatar;
        else {
            for(key in { name, view, title, like, url, caption, comments }) {
                if(imageFound[key] && req.body[key]) imageFound[key] = req.body[key];
            }
        }
        imageFound.save((err, imageUpdated)=>{
            if(err) res.status(500).json({ success:0, message: err})
            else res.status(201).json({ success: 1, image: imageUpdated})
        })
    })
})
module.exports = ImageRouter;