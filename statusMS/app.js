require('./config/config');
require('./models/db');

const express= require('express');
const bodyParser= require('body-parser');
const cors= require('cors');

// const uuidv4 = require("uuid/v4")
const rtsIndex=require('./routes/index.router');
const app =express();

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api',rtsIndex);

app.listen(process.env.PORT,()=> console.log(`server started at port : ${process.env.PORT}`));
