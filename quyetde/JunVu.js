const express = require('express');
const bodyParser= require('body-parser');
const fs = require('fs');
const app = express();
const questionList = require('./questions.json');
let questionRandom;

app.use(bodyParser.urlencoded({extended: false}));

app.get('/answer', (req,res) => {
    res.sendFile(__dirname + '/public/answer.html')
})

app.get('/vote', (req,res) => {
    res.sendFile(__dirname + '/public/vote.html');
})

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/answer.html')
})

app.get('/ask', (req,res) => {
    res.sendFile(__dirname + '/public/ask.html');
})

app.post('/creatquestions', (req,res) => {
    console.log(req.body);   
    const newQuest = {
        id: questionList.length,
        questionContent: req.body.questionContent,
        yes:0,
        no: 0,
    };

    questionList.push(newQuest);

    fs.writeFileSync('./questions.json', JSON.stringify(questionList));

    res.redirect('/answer');
});
app.get('/randomquestion', (req, res) => {
    if(questionList.length>0){
     questionRandom = questionList[Math.floor(Math.random()*questionList.length)];
        res.send(questionRandom);
    }
});
app.get('/voteQuest', (req,res) => {
    let questionList =JSON.parse(fs.readFileSync('./questions.json'));
    if(questionList.length > 0){
        let voteQuest = questionRandom;
        res.send(voteQuest); 
    }
});

app.post('/answer', (req,res) => {
    const {questionid, answer} = req.body;
    let questionList =JSON.parse(fs.readFileSync('./questions.json'));
    questionList[questionid][answer] +=1;
    fs.writeFileSync('./questions.json', JSON.stringify(questionList));
    res.send({success: 1});
});

app.use(express.static('public'));

app.listen(3003, (err) => {
    if(err)console.log(err)
    else console.log('Server is listening at port 3003')
});