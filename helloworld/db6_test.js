var db6 = require('./db6');

db6.loginSql({'uid':'nci','upw':'nci'}, function(err, rows) {
    console.log("callback 안에서 찍는다.");
    if (err) {
        console.log(err, "오류 발생");
    } else {
        console.log(rows);
    }
    
});

console.log("모듈화되지 않아서 접근 불가 =>", db6.connection)