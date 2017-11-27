// 모듈 가져오기
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

// 익스프레스 생성 =================================
// 노드 기반으로 웹 서비스, 웹 어플리케이션 서비스를 제작하는 fwk
var app = express();

// all environments
// 환경변수
// 포트
app.set('port', process.env.PORT || 3000);
// html 렌더링하는 view 파일들의 위치 (html)
app.set('views', __dirname + '/views');
// view를 처리하는 렌더링 엔진
app.set('view engine', 'ejs');
// 파비콘
app.use(express.favicon());
// 로그 레벨
app.use(express.logger('dev'));
// method 별 처리, 파라미터 파싱 처리 자동으로 해주는 모듈
app.use(express.bodyParser());
app.use(express.methodOverride());
// 라우팅을 위한 모듈 설정
app.use(app.router);
// 정적 요소, css, js, html 디렉토리 지정
app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname);
console.log(path.join(__dirname, 'public'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// 사용자의 요청을 분석하여 어떤 함수가 처리할지 연결해 주는 부분
// 라우트!! route
// get 방식 요청중에 url이 / 인 요청인 경우 처리하는 함수는 routes 모듈 안에 있는 index라는 함수가 처리한다.
app.get('/', routes.index);
app.get('/users', user.list);
// /login에 get 방식으로 요청을 하면 로그인 폼이 나온다.
app.get('/login', user.loginForm);
// /login에 post 방식으로 요청을 하면 로그인 처리를 한다.
app.post('/login', user.loginProc);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
