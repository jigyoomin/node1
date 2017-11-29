// 모듈 가져오기 ==============================
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// 내가 만든 모듈 가져오기 =========================
var index = require('./routes/index');
var users = require('./routes/controller/users');
var mains = require('./routes/controller/mains');
// 익스프레스 생성 ================================
var app = express();
var session = require('express-session');

// 엔진 설정 =====================================
// views (렌더링 할 파일들의 위치)의 물리적인 위치 설정
app.set('views', path.join(__dirname, 'views'));
// 템플릿 엔진 설정
app.set('view engine', 'ejs');

// 환경 설정 =============================
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 로그 표시
app.use(logger('dev'));
// 파라미터 분석 및 처리
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 쿠키
app.use(cookieParser());
// 정적 위치 설정 (js, css, image, 파일 업로드 등등)
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
 secret: '@#@$MYSIGN!!@@#AA#@$#$',
 resave: false,
 saveUninitialized: true
}));

// 모든 요청, 응답은 이곳을 타고 들어온다.
// 이때, 특정 요청과 특정 응답에 특정 작업을 하고 싶다면 (사전(req), 사후(res))
// 여기서 작업을 수행한다.
app.use( (req, res, next) => {
  console.log("all req");
  if ( req.path == '/users/login' || req.path == '/'
  || req.path == '/users/signup'
  || req.path == '/main/upload') {
    next();
  } else {
    if (req.session.uid) {
      next();
    } else {
      res.redirect('/users/login');
    }
  }
})

// 라우트 => URL PATH의 상위 라우트를 지정함.
// /
// /users => /users, /users/signup, /users/login, /users/logout ...
// /service
// /...
app.use('/', index);
app.use('/users', users);
app.use('/main', mains);

// 404, 500 등 주요 에러 설정 =======================
// 404 에러 발생시 모두 이쪽으로 요청을 보낸다.
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 500 에러
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



// 객체의 모듈화 ===========================
module.exports = app;
