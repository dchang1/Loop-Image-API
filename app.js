var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var multer = require('multer');
var fileUpload = require('express-fileupload');

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/image', require('./routes/image'));
app.set()
mongoose.connect('mongodb://dchang2:n3w8h5s6@ds153494.mlab.com:53494/imagetesting')

app.listen(8000, function(){
  console.log('Express started. Listening on %s', 8000);
});
