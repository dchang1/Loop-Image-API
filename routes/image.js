var express = require('express');
var router = express.Router();
var fs = require('fs');
var Post = require('../models/post');
var multer = require('multer');
var upload = multer({dest: './uploads/'});
var fileUpload = require('express-fileupload');
var Jimp = require('jimp');
var formidable = require('formidable');

  router.post('/post', function(req, res) {
    Jimp.read(req.files.image.name, function(err, image) {
      if (err) throw err;
      image.quality(50);
      image.scaleToFit(1080, 1920)
           //.write("test2-resized.jpeg");
      image.getBase64(Jimp.AUTO, function(err, image){
        var newPost = new Post({
          image: image
        })
        newPost.save(function(err, newPost) {
          if(err) throw err;
        })
      })
      console.log("file resized");
    });
    res.send("file uploaded to server");
  });

    router.get('/upload', function (req, res){
        res.render('upload');
    });

  router.get('/save/:id', function(req, res) { //save to disk
    Post.findById(req.params.id).exec(function(err, post) {
      if (err) {
        throw err;
      }
      else {
        let data = (post.image).replace(/^data:image\/\w+;base64,/, '')
        fs.writeFile('Decoded-Image.jpeg', data, {encoding: 'base64'}, function(err) {
          if (err) throw err;
        })
      }
    })
    res.send("File saved to disk");
  });

  router.get('/:id', function(req, res) {
    Post.findById(req.params.id).exec(function(err, post) {
      if(err) {
        throw err;
      }
      else {
        res.render('image', {image: post.image})
      }
    })
  });

module.exports = router;
