const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ImageSchema = new Schema({
    name: { type: String, required:true},
    view: { type: Number,  default:0},
    title: { type: String, required:true},
    like: { type: Number, default:0},
    url: { type: String, required: true},
    caption: {type: String},
    comments: [{ type: String }]
}, { 
    timestamps: true
});
module.exports = mongoose.model("Image", ImageSchema);