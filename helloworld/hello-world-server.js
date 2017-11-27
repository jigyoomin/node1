/*
 * require('모듈명') => 본코드 이외의 모듈(라이브러리)등을 사용할때 호출한다.
 * => 해당 모듈의 객체가 온다!!
 * 모듈명 : 내장형, 서드파트, 개발자 직접 구현
 *  - 내장형 : nodejs를 설치하면 자동으로 같이 설치되는 모듈들
 *           http, events, fs, .... (https://nodejs.org/dist/latest-v8.x/docs/api/http.html)
 *           ex) require('fs');
 *  - 서드파트 : 개발시 필요에 의해 설치한 모듈
 *           npm install mysql
 *           ex) require('mysql');
 *  - 직접 개발 : 만약에 본 코드랑 같은 디렉토리에 mod.js를 만들었다면
 *           ex) require('./mod');
 *               require('./mod.js')
 * => 여러 코드에서 동일한 모듈을 댕긴다고 하더라도 각각 객체가 생성되는것은 아니다.
 * => 위치는 통상 위에 있지만, 코드 어느 위치던지 존재할 수 있다.                 
 */
var http = require('http');

var port = 1337;
var cb = function handler(req, res) {
    console.log(req);
    if (req.url == '/main') {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end('main 한글\n');
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end('etcetc 한글한글\n');
    }
};

http.createServer(cb).listen(port, '127.0.0.1');

console.log('Server running at http://127.0.0.1:' + port + '/');
