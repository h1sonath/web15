const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
const QuestionModel = require('./model/questionModel')
mongoose.connect('mongodb://localhost/quyetde', (err) => {
    if (err) console.log(err)
    else console.log('DB connect success')
})


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/answer.html');
});

app.get('/ask', (req, res) => {
    res.sendFile(__dirname + '/public/ask.html');
});

app.get('/answer', (req, res) => {
    res.sendFile(__dirname + '/public/answer.html');
});

app.post('/createquestions', (req, res) => {
 


    // const newQuestion = new QuestionModel({
    //     questionContent: req.body.questionContent,
    //     yes: 0,
    //     no: 0
    // })
    QuestionModel.create(
        {questionContent:req.body.questionContent },
        (err, questionCreated)=>{
            if(err) console.log(err)
            else res.redirect('/question/' + questionCreated._id);

        }
    )
//     newQuestion.save();
//     res.redirect('/answer');
});

app.get('/randomquestion', (req, res) => {
    //findOne
    let questionList = JSON.parse(fs.readFileSync('./questions.json'));

    if (questionList.length > 0) {
        let randomIndex = Math.floor(Math.random() * questionList.length);
        let questionRandom = questionList[randomIndex];
        question = questionRandom;
        res.send(questionRandom);
    }
});

app.post('/answer', (req, res) => {
    const { questionid, answer } = req.body;
    // const questionid = req.body.questionid;
    // const answer = req.body.answer;
    // let questionList = JSON.parse(fs.readFileSync('./questions.json'));
    // questionList[questionid][answer] += 1;
    // fs.writeFileSync('./questions.json', JSON.stringify(questionList));
    // res.send({ success: 1 });
});

app.get('/question/:questionId', (req, res) => {
    res.sendFile(__dirname + "/public/vote.html");
});

app.get('/questiondetail/:questionId', (req, res) => {
    let questionId = req.params.questionId;
    let questionList = JSON.parse(fs.readFileSync('./questions.json'));
    res.send({ success: 1, question: questionList[questionId] });
});

app.use(express.static('public'));

app.listen(3003, (err) => {
    if(err)console.log(err)
    else console.log('Server is listening at port 3003')
});