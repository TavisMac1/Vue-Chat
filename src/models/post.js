const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: false
    },
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;