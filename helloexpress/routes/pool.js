/*
 * DB 컨넥션을 미리 잡아두고 관리한다.
 * 요청이 몰렸을 때 균일한 처리 속도 및 DB 연결성을 보장한다.
 * npm install generic-pool@2.5 --save
 * 버전에 따른 사용법이 다르다.
 */

var Pool = require('generic-pool').Pool;
var mysql       = require('mysql');

// 풀 생성
var pool        = new Pool({
    name:'',
    create:function(cb){
        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'root',
            database : 'nodejs'
        });
        connection.connect(function(err) {
            // 풀링에게 커넥션 객체를 보내줘야 함.
            cb(err, connection);
        });
    },  // cb를 통해 커넥션을 보내준다.(max 값 만큼)
    destroy:function(conn){
        if (conn) {
            conn.end();
        }
    }, // 커넥션 객체를 보내서 연결 종료.(max 값 만큼)
    max:15,
    min:10,
    log:true,               // 커넥션 수를 계속 모니터링하여 코드상에 어디가 반납하고 있지 않는지 확인한다.
    idleTimeoutMillis:600*1000
}); 

// 이벤트 등록(오류, 해제)
process.on('uncaughtException', (err) => {
    // 전체 구동중 예외 상황 발생시 이쪽으로 모두 전달한다.
    console.log(err);
});

process.on('exit', (err) => {
    // 반납
    pool.drain(function() {
        pool.destroyAllNow();
    });
});


// 객체 모듈화
module.exports = pool;
