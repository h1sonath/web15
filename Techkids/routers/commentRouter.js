const express = require('express');
const CommentRouter = express.Router();

const CommentModel = require('../models/CommentModel');

CommentRouter.use((req, res, next) => {
    console.log("Comment middleware");
    next();
});

CommentRouter.get("/", (req, res) => {
    CommentModel.find({}, (err, Comments) => {
        if (err) res.status(500).json({ success: 0, error: err })
        else res.json({ success: 1, comments });
    });
});

CommentRouter.post("/", (req, res) => {
    console.log(req.body);
    const { Comment, view, like, url, caption, title, comments } = req.body;
    CommentModel.create({ Comment, view, like, url, caption, title, comments }, (err, commentCreated) => {
        if (err) res.status(500).json({ success: 0, error: err })
        else res.status(201).json({ success: 1, comments: commentCreated });
    });
});

CommentRouter.put("/:id", (req, res) => {
    const commentId = req.params.id;
    const { Comment, view , like, url, caption, title, comments } = req.body;
    // CommentModel.findByIdAndUpdate(CommentId, { name, password, avatar, intro }, { new: true }, (err, CommentUpdated) => {
    //     if (err) res.status(500).json({ success: 0, message: err })
    //     else res.json({ success: 1, Comments: CommentUpdated });
    // });
    CommentModel.findById(commentId, (err, commentFound) => {
        if (err) res.status(500).json({ success: 0, message: err })
        else if (!commentFound._id) res.status(404).json({ success: 0, message: "Not found" })
        else {
            for (key in { Comment, view , like, url, caption, title, comments }) {
                if (commentFound[key] && req.body[key]) commentFound[key] = req.body[key];
            }

            commentFound.save((err, commentUpdated) => {
                if (err) res.status(500).json({ success: 0, message: err })
                else res.status(201).json({ success: 1, comments: commentUpdated });
            });
        };
    });
});

CommentRouter.delete("/:id", (req, res) =>{
    const commentId = req.params.id;
    CommentModel.remove(commentId, (err)=>{
        if (err) res.status(500).json({success: 0, message: err})
        else res.json({success: 1})
    })
})


module.exports = CommentRouter;