// nodejs에서 database handling
// 0단계 해당 DB에 엑세스할 수 있는 모듈 설치
// mysql 계열(mysql, maria, 오로라)
// npm install mysql --save
// --save : package.json 파일이 존재할 경우 dependencies에 해당 모듈 추가 기술 후
// 모듈을 설치한다.
// 확인
var mysql = require('mysql');

// 1단계, 연결하고, 연결 끊기
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'nodejs'
});

connection.connect(function() {
    console.log("접속됐단다.");

    var sql = "SELECT * from users where uid=? and upw=?;";
    connection.query(sql, ['nci', 'nci'], function (err, rows) {
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


