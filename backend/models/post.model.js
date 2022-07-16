const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
let postSchema= new mongoose.Schema({
    fullName:{
        type: String,
        required: 'fullname can\'t be empty'
    },
    email: {
        type: String,
        required: 'email can\'t be empty'
    },
    status: {
        type: String,
        required: 'password can\'t be empty'
    },
    dom: {
        type: Date
    }
});

mongoose.model('Post',postSchema);