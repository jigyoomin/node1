var express = require('express');
var router = express.Router();
var db7 = require("../model/db7");
var mains = require("./mains");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 로그인 폼 처리
// /users/login
router.get('/login', function(req, res){
    res.render( 'loginForm' );
});

// 로그인 처리
// /users/login
router.post('/login', function(req, res){
    // post 방식으로 데이터가 전달되었을때 데이터 추출!!
    // get 방식은 req.query
    console.log( req.body);
    console.log(req.body.uid);
    console.log(req.body.upw);

    db7.loginSql({'uid':req.body.uid, 'upw':req.body.upw}, function(err, rows){
        console.log(rows);
        if (err || rows.length == 0) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end("<script>alert('로그인실패');history.back();</script>");
        } else {
            var sess;
            sess = req.session;
            sess.uid = rows[0].uid;
            sess.name = rows[0].name;
            sess.level = rows[0].level;

            res.redirect('/main');
        }
    });

});

// 로그인 처리
// /users/login
router.get('/logout', function(req, res){
  var session;
  session = req.session;
  if (mains.isEmpty(session.uid)) {
    delete session.uid;
    delete session.name;
    delete session.level;
    session.destroy();
  } else {
    session.uid = null;
    session.name = null;
    session.level = null;
  }
  res.redirect('/');

});

// /users/signup
router.get('/signup', function(req, res){
    res.render( 'signup' );
});

// /users/signup
router.post('/signup', function(req, res){
    console.log(req.body);
    db7.signup({'uid':req.body.uid, 'upw':req.body.upw, 'name':req.body.name}, function(err, rows){
      console.log(rows);
      if (err) {
        res.send({code:-1,result:err});
      } else {
        res.send({code:1})
      }
    });
});

// users/modify
router.get('/modify', function(req, res){
  var sess = req.session;
  if (sess.uid) {
    console.log(sess);
    res.render( 'modify', {uid:sess.uid, name:sess.name});

  } else {
    res.redirect("/users/login");

  }


});

// /users/modify
router.post('/modify', function(req, res){
    console.log(req.body);
    var sess = req.session;
    if (sess.uid) {
      db7.modify({'uid':sess.uid, 'upw':req.body.upw, 'name':req.body.name}, function(err, rows){
        console.log(rows);
        if (err) {
          res.send({code:-1,result:err.sqlMessage});
        } else {
          sess.name = req.body.name;
          res.send({code:1})
        }
      });

    } else {
      res.send({code:-1,result:'로그인부터..'});
    }
});

module.exports = router;
