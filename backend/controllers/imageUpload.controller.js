const Minio = require('minio')

// Instantiate the minio client with the endpoint
// and access keys as shown below.
const minioClient = new Minio.Client({
    endPoint: '192.168.0.101',
    port: 9000,
    useSSL: false,
    accessKey: 'JMls6wDuivFGpIEs',
    secretKey: 'P8ATEAbirhzTTPzAqgpXytXqVnz0dJZI'
});

// File that needs to be uploaded.
let file = "./origami.png"

// Make a bucket called europetrip.
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
    // var metaData = {
    //     'Content-Type': 'application/octet-stream',
    //     'X-Amz-Meta-Testing': 1234,
    //     'example': 5678
    // }
    // // Using fPutObject API upload your file to the bucket europetrip.
    // minioClient.fPutObject('imagetest', 'LOGO 1', file, metaData, function(err, etag) {
    //   if (err) return console.log(err)
    //   console.log('File uploaded successfully.')
    // });
