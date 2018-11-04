const express = require('express');
const CommentRouter = express.Router();

const CommentModel = require('../models/CommentModel');

CommentRouter.use((req, res, next) => {
    console.log("Comment middleware");
    next();
});

CommentRouter.get("/", (req, res) => {
    CommentModel.find({}, (err, users) => {
        if (err) res.status(500).json({ success: 0, error: err })
        else res.json({ success: 1, comments });
    });
});

CommentRouter.post("/", (req, res) => {
    console.log(req.body);
    const { user, view, like, url, caption, title, comments } = req.body;
    CommentModel.create({ user, view, like, url, caption, title, comments }, (err, commentCreated) => {
        if (err) res.status(500).json({ success: 0, error: err })
        else res.status(201).json({ success: 1, comments: commentCreated });
    });
});

CommentRouter.put("/:id", (req, res) => {
    const commentId = req.params.id;
    const { user, view , like, url, caption, title, comments } = req.body;
    // UserModel.findByIdAndUpdate(userId, { name, password, avatar, intro }, { new: true }, (err, userUpdated) => {
    //     if (err) res.status(500).json({ success: 0, message: err })
    //     else res.json({ success: 1, users: userUpdated });
    // });
    CommentModel.findById(commentId, (err, commentFound) => {
        if (err) res.status(500).json({ success: 0, message: err })
        else if (!commentFound._id) res.status(404).json({ success: 0, message: "Not found" })
        else {
            for (key in { user, view , like, url, caption, title, comments }) {
                if (commentFound[key] && req.body[key]) commentFound[key] = req.body[key];
            }

            commentFound.save((err, commentUpdated) => {
                if (err) res.status(500).json({ success: 0, message: err })
                else res.status(201).json({ success: 1, comments: commentUpdated });
            });
        };
    });
});


module.exports = CommentRouter;