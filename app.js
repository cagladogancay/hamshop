const dotenv = require('dotenv').config();
const morgan = require('morgan');
const express =require('express');
const bodyParser = require('body-parser');
const indexRouter =require('./routers/index');
const passport = require('passport');
require('./config/db-config');
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/',indexRouter);
app.use(passport.initialize())
require('./config/passport')(passport);

app.listen(process.env.PORT,()=>{
    console.log(`${process.env.PORT} bağlandı`);
});