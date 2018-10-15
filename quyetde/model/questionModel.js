const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const QuestionSchema = new Schema({
    questionContent: {type: String, required: true},
    yes: {type: Number, default:0},
    no: {type: Number, default:0}
})

const QuestionModel = mongoose.model('Question', QuestionSchema);
QuestionModel.findOne({"questionContent": 'abc'}), (err, questions)=> {
    if(err) console.log(err)
    else console.log('question', questions);
}
module.exports = mongoose.model('Question', QuestionSchema);