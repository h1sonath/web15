const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRouter = require('./routers/userRouter');
const imageRouter = require('./routers/imageRouter');


mongoose.connect("mongodb://localhost/techkidhotgirl", (err) => {
    if (err) console.log(err);
    else console.log("DB connect success")
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.use("/api/images", imageRouter);

app.use("/api/comments", commentRouter);

app.get('/api', (res, req) => {
    res.send("API router");
})
const port = 3003;
app.listen(port, (err)=>{
    if(err) console.log(err)
    else console.log("Listening at port 3003")
    
})