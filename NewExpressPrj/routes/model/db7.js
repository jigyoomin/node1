// 모듈화
var pool = require('./pool');
var mysql = require('mysql');

exports.loginSql = function(param, cb) {
  // 커넥션 빌리고
  pool.acquire(function(err, conn) {
    if (err) {
      // 커넥션을 확보 못했다.
      cb(err, []);
    } else {
      // 빌렸다 -> 쿼리 -> 응답 -> 반납
      var sql = "SELECT * from users where uid=? and upw=?;";
      // 쿼리
      conn.query(sql, [param.uid, param.upw], function(err1, rows) {
        // 반납
        pool.release(conn);
        // 응답
        cb(err1, rows);
      });
    }
  });

};

exports.getEplInfo = function(param, cb) {
  // 커넥션 빌리고
  pool.acquire(function(err, conn) {
    if (err) {
      // 커넥션을 확보 못했다.
      cb(err, []);
    } else {
      // 빌렸다 -> 쿼리 -> 응답 -> 반납
      var sql = "select * from tbl_epl order by rank asc";
      // 쿼리
      conn.query(sql, function(err1, rows) {
        // 반납
        pool.release(conn);
        // 응답
        cb(err1, rows);
      });
    }
  });

}

exports.searchEplInfo = function(param, cb) {
  // 커넥션 빌리고
  pool.acquire(function(err, conn) {
    if (err) {
      // 커넥션을 확보 못했다.
      cb(err, []);
    } else {
      // 빌렸다 -> 쿼리 -> 응답 -> 반납
      var sql = "select * from tbl_epl where name like ? order by rank asc";
      // 쿼리
      conn.query(sql, ['%' + param.keyword + '%'], function(err1, rows) {
        // 반납
        pool.release(conn);
        // 응답
        cb(err1, rows);
      });
    }
  });
}

exports.getEplHomepage = function(param, cb) {
  // 커넥션 빌리고
  pool.acquire(function(err, conn) {
    if (err) {
      // 커넥션을 확보 못했다.
      cb(err, []);
    } else {
      // 빌렸다 -> 쿼리 -> 응답 -> 반납
      var sql = "select homepage from tbl_epl where id=?;";
      // 쿼리
      conn.query(sql, [param.id], function(err1, rows) {
        // 반납
        pool.release(conn);
        // 응답
        cb(err1, rows);
      });
    }
  });
}

exports.signup = function(param, cb) {
  // 커넥션 빌리고
  pool.acquire(function(err, conn) {
    if (err) {
      // 커넥션을 확보 못했다.
      cb(err, []);
    } else {
      // 빌렸다 -> 쿼리 -> 응답 -> 반납
      var sql = "insert into users(uid,upw,name) values(?,?,?)";
      // 쿼리
      conn.query(sql, [param.uid, param.upw, param.name], function(err1, rows) {
        // 반납
        pool.release(conn);
        // 응답
        cb(err1, rows);
      });
    }
  });
}

exports.modify = function(param, cb) {
  // 커넥션 빌리고
  pool.acquire(function(err, conn) {
    if (err) {
      // 커넥션을 확보 못했다.
      cb(err, []);
    } else {
      // 빌렸다 -> 쿼리 -> 응답 -> 반납
      var sql = "update users set upw=?, name=? where uid=?";
      // 쿼리
      conn.query(sql, [param.upw, param.name,param.uid], function(err1, rows) {
        // 반납
        pool.release(conn);
        // 응답
        cb(err1, rows);
      });
    }
  });
}
