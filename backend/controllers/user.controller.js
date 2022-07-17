const mongoose= require('mongoose');
const passport = require('passport');

const _ = require('lodash');
const e = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const User=mongoose.model('User');
const Post=mongoose.model('Post');

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

// module.exports.authenticate =(req,res,next)=>{
//    passport.authenticate('local', (err, user, info)=>{
//         if(err)return res.status(400).json(err);
//         else if(user)return res.status(200).json({"token": user.generateJwt()});
//         else return res.status(404).json(info);
//    })(req,res);

// }
module.exports.authenticate =(req,res,next)=>{
    passport.authenticate('local', (err, user, info)=>{
         if(err)return res.status(400).json(err);
         else if(user){
             req.headers={"authorization": user.generateJwt()};
             next();
         }
         else return res.status(404).json(info);
    })(req,res);
 
 }

module.exports.userProfile=(req, res, next)=>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user) return res.status(404).json({ status: false, message: 'User record not found.' });
            // else return res.status(200).json({ status: true, user : _.pick(user,['fullName','email','token']) });
            else{
                loggeduser={
                    fullName:user.fullName,
                    email : user.email,
                    token : req.token
                };
                return res.status(200).json(loggeduser);
            }
        }
    );
}
module.exports.getStatus=(req,res,next)=>{
    Post.find({ email: { $ne: req.headers['email'] }},
        (err,post)=>{
            // if (!post) return res.status(404).json({ status: false, message: 'No post.' });
            // else return res.status(200).json({ status: true, post : _.pick(post,['fullName','email']) });
            console.log(req.headers['email']);
            if(!post)res.status(404).send("kisu bhul hoise");
            else res.status(200).send(post);
        }
    ).sort({dom: -1});
}
module.exports.postStatus=(req,res,next)=>{
    const post=new Post();
    post.fullName=req.body.fullName;
    post.email=req.body.email;
    post.status=req.body.status;
    post.dom=new Date();
    post.save((err,doc)=>{
        if(!err){
            res.send(doc);
        }
    })

}