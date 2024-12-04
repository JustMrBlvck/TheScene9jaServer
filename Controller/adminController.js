const User = require('../models/userModel');
const Post = require('../Model/Post');


exports.getAllUser = (req, res) => {
    User.find()
       .then(users => res.send(users))
       .catch(err => res.status(500).send({ error: 'Server error' }));
};

exports.UpdateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(users => res.send(users))
        .catch(err => res.status(500).send({ error: 'Server error' }));
};

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => res.send(user))
        .catch(err => res.status(500).send({ error: 'Server error' }));
};

// Posts
exports.getAllPost = (req, rers) => {
    Post.find()
       .then(posts => res.send(posts))
       .catch(err => res.status(500).send({ error: 'Server error' }));
};



exports.deletePost = (Req, res) =>{
    Post.findByIdAndDelete(req.params.id)
        .then(post => res.send(post))
        .catch(err => res.status(500).send({ error: 'Server error' }));
};