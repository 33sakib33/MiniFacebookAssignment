//check env.
const env= process.env.NODE_ENV || 'development';

const config = require('./config.json');

const curConfig= config[env];

Object.keys(curConfig).forEach(key => process.env[key]=curConfig[key]);