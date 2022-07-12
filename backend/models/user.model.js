const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');
let userSchema= new mongoose.Schema({
    fullName:{
        type: String,
        required: 'fullname can\'t be empty'
    },
    email: {
        type: String,
        required: 'email can\'t be empty'
    },
    password: {
        type: String,
        required: 'password can\'t be empty'
    },
    saltSecret: String
});

userSchema.pre('save',function(next){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password=hash;
            this.saltSecret=salt;
            next();
        })
    })
});

mongoose.model('User',userSchema);
