const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/post');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const dburi = 'mongodb+srv://tavisMac:test1234@cluster0.d0vxh.mongodb.net/Cluster0?retryWrites=true&w=majority';
mongoose.connect(dburi, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000), console.log('connected to db'))
    .catch((err) => console.log(err))


    /*
app.get('/add-msg', (req, res) => { //create new model to add data
    const postMsg = new Post({
        userName: 'tavis tester',
        message: 'hello again from mongo'
    });
    postMsg.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
}) */

app.get('/messages', (req, res) => {
    Post.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err)
        });
})

app.post('/add-msg', (req, res) => {
    console.log('Request is ' + req.body.username);
    const postMsg = new Post({
        userName: req.body.username,
        message: req.body.msg,
    });
    postMsg.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/', (req, res) => {
    res.send('<h1>  OI </h1>');
    console.log('running')
});