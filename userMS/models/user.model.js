const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
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
userSchema.methods.verifyPassword= function(password){
    return bcrypt.compareSync(password, this.password);
}
userSchema.methods.generateJwt=function(){
    return jwt.sign({_id:this._id},
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        });
}
mongoose.model('User',userSchema);
