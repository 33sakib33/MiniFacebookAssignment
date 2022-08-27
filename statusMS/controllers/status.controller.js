const mongoose= require('mongoose');


const _ = require('lodash');
const e = require('express');


const Post=mongoose.model('Post');

module.exports.getStatus=(req,res,next)=>{
    Post.find({ email: { $ne: req.headers['email'] }},
        (err,post)=>{
            // if (!post) return res.status(404).json({ status: false, message: 'No post.' });
            // else return res.status(200).json({ status: true, post : _.pick(post,['fullName','email']) });
            console.log(post);
            if(!post)res.status(404).send("Not found");
            else res.status(200).send(post);
        }
    ).sort({dom: -1}).limit(10);
}
module.exports.postStatus=(req,res,next)=>{
    console.log("here");
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

