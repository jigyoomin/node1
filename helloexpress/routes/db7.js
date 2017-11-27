// 모듈화
var pool = require('./pool');
var mysql = require('mysql');

exports.loginSql = function(param, cb) {
    // 커넥션 빌리고
    pool.acquire(function (err, conn ){
        if (err) {
            // 커넥션을 확보 못했다.
            cb(err, []);
        } else {
            // 빌렸다 -> 쿼리 -> 응답 -> 반납
            var sql = "SELECT * from users where uid=? and upw=?;";
            // 쿼리
            conn.query(sql, [param.uid, param.upw], function (err1, rows) {
                // 반납
                pool.release(conn);
                // 응답
                cb(err1, rows);
            });
        }
    });
    
};

