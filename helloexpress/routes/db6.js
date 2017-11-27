// 모듈화
var mysql = require('mysql');

//1단계, 연결하고, 연결 끊기
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'nodejs'
});

exports.loginSql = function(param, cb) {
    // 비동기 I/O 처리 필요 => 콜백함수 등록하여 다음 단계를 진행함.
    connection.connect(function() {
        console.log("접속됐단다.");

        var sql = "SELECT * from users where uid=? and upw=?;";
        connection.query(sql, [param.uid, param.upw], function (err, rows) {
            cb(err, rows);

            
        });
//        connection.end(function(err) {
//            console.log("접속 종료.");
//            console.log(err);
//        });
//
    });
};

//exports.loginSql({'uid':'nci','upw':'nci'});
