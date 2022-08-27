const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
let imageSchema= new mongoose.Schema({
    fullName:{
        type: String,
        required: 'fullname can\'t be empty'
    },
    email: {
        type: String,
        required: 'email can\'t be empty'
    },
    uuid: {
        type: String,
        required: 'password can\'t be empty'
    },
    path:{
        type: String
    },
    dom: {
        type: Date 
    }
});
imageSchema.methods.generateUUID=function(){
    uid=uuidv4();
    return uid;
}
mongoose.model('images',imageSchema);