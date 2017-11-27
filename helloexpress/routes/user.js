
/*
 * 모듈화 => exports.함수명 = 익명함수,
 *         exports.변수명 = 값,
 *         module.exports = 객체명
 * 내가 만든 모듈에서 일반 함수, 변수는?
 * 내부에서만 사용되는 private한 접근 제한을 가진 함수나 변수가 됨. 
 */

var db7 = require("./db7");

exports.list = function(req, res){
    res.send("respond with a resource 한글");
};

exports.loginForm = function(req, res){
    res.render( 'loginForm' );
};

exports.loginProc = function(req, res){
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
            res.redirect('/main');
        }
    });
    
};