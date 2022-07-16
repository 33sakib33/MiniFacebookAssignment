require('./config/config');
require('./models/db');
require('./config/passportConfig')
const express= require('express');
const bodyParser= require('body-parser');
const cors= require('cors');
const passport=require('passport');
const rtsIndex=require('./routes/index.router');
const app =express();

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api',rtsIndex);

app.listen(process.env.PORT,()=> console.log(`server started at port : ${process.env.PORT}`));
