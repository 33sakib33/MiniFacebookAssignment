
const Minio = require('minio')
const mongoose= require('mongoose');
const passport = require('passport');

const _ = require('lodash');
const e = require('express');
const { v4: uuidv4 } = require('uuid');
const Image=mongoose.model('images');
// Instantiate the minio client with the endpoint
// and access keys as shown below.
const minioClient = new Minio.Client({
    endPoint: '192.168.0.102',
    port: 9000,
    useSSL: false,
    accessKey: 'dqmw3hkUmQBZuGZk',
    secretKey: 'XiykP4IiGNrOhoaqXmcBOsEv2hpcN9MP'
});

// File that needs to be uploaded.
let file = "controllers//origami.png"

// Make a bucket called europetrip.
minioClient.bucketExists('imagetest1', function(err, exists) {
    if (err) {
     return console.log(err)
    }
  
    if (!exists) {
       minioClient.makeBucket('imagetest1', (err) => {
        if (err) {
          console.log('minio error '+err);
        }
      });
    }
  });
module.exports.getImage=(req,res,next)=>{
    minioClient.getObject('imagetest1', 'LOGO 1', function(err, dataStream) {
        if (err) {
            return console.log(err)
        }
        dataStream.on('data', function(chunk) {
            size += chunk.length
        })
        dataStream.on('end', function() {
            console.log('End. Total size = ' + size)
        })
        dataStream.on('error', function(err) {
            console.log(err)
        })
    })
}
module.exports.getUuidForUser=(req,res,next)=>{
    Image.find({ email: { $ne: req.headers['email'] }},
    (err,imageList)=>{
        // if (!post) return res.status(404).json({ status: false, message: 'No post.' });
        // else return res.status(200).json({ status: true, post : _.pick(post,['fullName','email']) });
        console.log(req.headers['email']);
        if(!imageList)res.status(404).send("Not found");
        else {
            req.body.imageList=imageList;
            next();
        }
    }).sort({dom: -1});
}
module.exports.generateUUID=(req,res,next)=>{
    uid=uuidv4();
    req.body.uuid=uid;
    next();
}
module.exports.uploadImage=(req,res,next)=>{
    minioClient.fPutObject('imagetest1', req.body.uuid, req.body.path, function(err, etag) {
              
              if (err) res.send("hoy nai");
              else res.send(req.body.uuid);
            });
}
module.exports.uploadImageIDmongoDB=(req,res,next)=>{
    image1= new Image();
    image1.fullName=req.body.fullName;
    image1.email=req.body.email;
    image1.uuid=req.body.uuid;
    image1.path=req.body.path;
    image1.dom= new Date();
    image1.save((err,doc)=>{
        if(!err){
            next();
        }
        else{
            res.send(req.body.fullName+" "+ req.body.uuid);
        }
    })
}
// minioClient.makeBucket('imagetest1', function(err) {
//     if (err) return console.log(err)

//     console.log('Bucket created successfully in "us-east-1".')

//     var metaData = {
//         'Content-Type': 'application/octet-stream',
//         'X-Amz-Meta-Testing': 1234,
//         'example': 5678
//     }
//     // Using fPutObject API upload your file to the bucket europetrip.
//     minioClient.fPutObject('imagetest', 'origami', file, metaData, function(err, etag) {
//       if (err) return console.log(err)
//       console.log('File uploaded successfully.')
//     });
// });
var size = 0
// minioClient.getObject('imagetest1', 'LOGO 1', function(err, dataStream) {
//   if (err) {
//     return console.log(err)
//   }
//   dataStream.on('data', function(chunk) {
//     size += chunk.length
//   })
//   dataStream.on('end', function() {
//     console.log('End. Total size = ' + size)
//   })
//   dataStream.on('error', function(err) {
//     console.log(err)
//   })
// })
    var metaData = {
        'Content-Type': 'application/octet-stream',
        'X-Amz-Meta-Testing': 1234,
        'example': 5678
    }
    // Using fPutObject API upload your file to the bucket europetrip.
    // minioClient.fPutObject('imagetest1', 'LOGO 1', file, metaData, function(err, etag) {
    //   if (err) return console.log(err)
    //   console.log('File uploaded successfully.')
    // });
