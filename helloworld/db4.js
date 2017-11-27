// 함수화
var mysql = require('mysql');

//1단계, 연결하고, 연결 끊기
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'nodejs'
});

var loginSql = function(param) {
    // 비동기 I/O 처리 필요 => 콜백함수 등록하여 다음 단계를 진행함.
    connection.connect(function() {
        console.log("접속됐단다.");

        var sql = "SELECT * from users where uid=? and upw=?;";
        connection.query(sql, [param.uid, param.upw], function (err, rows) {
            if (err) {
                console.log(err, "오류 발생");
            } else {
                console.log(rows);
            }
            connection.end(function() {
                console.log("접속 종료.");
            });
        });

    });
};

loginSql({'uid':'nci','upw':'nci'});
