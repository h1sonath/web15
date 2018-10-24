const express = require('express');
const bodyParser = require('body-parser');
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
            else res.redirect('/question/' + questionCreated.id);

        }
    )
//     newQuestion.save();
//     res.redirect('/answer');
});

app.get('/randomquestion', (req, res) => {
    QuestionModel.count({}, (err, count) => {
		let randomIndex = Math.floor(Math.random()*count);
		QuestionModel.findOne({}, null, { skip: randomIndex }, (err, questionFound) => {
			if (err) console.log(err)
			else res.send(questionFound);
		})
	})

})

    app.post('/answer', (req, res) => {
        let {questionid , answer} = req.body;
        QuestionModel.findById(questionid, (err, questionFound) =>{
            if(err) console.log(err)
            else if (!questionFound) console.log('Not Found');
            else {
                questionFound[answer] +=1;
                questionFound.save((err) => {
                    if(err) console.log(err)
                  else res.send({success :1});
                })
            }
        });
    });

app.get('/question/:questionId', (req, res) => {
    res.sendFile(__dirname + "/public/vote.html");
});

app.get('/questiondetail/:questionId', (req, res) => {
    let questionId = req.params.questionId;
    QuestionModel.findById(questionId, (err, questionFound) =>{
        if(err) console.log(err)
        else if (!questionFound) console.log('Not Found');
        else {
                res.send({ success: 1, question: questionFound })
        };
    });
});


app.use(express.static('public'));

app.listen(3003, (err) => {
    if(err)console.log(err)
    else console.log('Server is listening at port 3003')
});