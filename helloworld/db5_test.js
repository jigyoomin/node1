var db5 = require('./db5');

db5.loginSql({'uid':'nci','upw':'nci'});

console.log("모듈화되지 않아서 접근 불가 =>", db5.connection)