const mongoose= require('mongoose');
const User=mongoose.model('User');

module.exports.register =(req,res,next)=>{
    const user=new User();
    user.fullName=req.body.fullName;
    user.email=req.body.email;
    user.password=req.body.password;
    user.save((err,doc)=>{
        if(!err){
            res.send(doc);
        }
    })

}