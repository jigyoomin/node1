var express = require('express');
var router = express.Router();
var db7 = require("../model/db7");
var multiparty = require('multiparty');
var path = require('path');
var fs = require('fs');

// URL : /main
router.get('/', function(req, res, next) {

  var session = req.session;
  if (session.uid) {
    // epl 정보 가져오기 => 쿼리 수행
    db7.getEplInfo({}, function(err, rows){
      console.log(rows);
      // 응답 => 렌더링
      if (err) {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end("<script>alert('정보 가져오기 실패. 잠시 후 다시 이용해주세요.');history.back();</script>");
      } else {
        res.render('main', { epl:rows, title:'오늘의 EPL', name:session.name});
      }
    });
  } else {
    res.redirect('/users/login');

  }
});

// URL : /main/search
router.post('/search', function(req, res, next) {
  // 검색어 추출 > 잘 오는지 확인
  var searchKeyword = req.body.keyword;

  // 쿼리 수행
  db7.searchEplInfo({keyword:searchKeyword}, function(err, rows){
    console.log(rows);
    var code = err ? -1 : 1;
    res.json({code:code, keyword:searchKeyword, results:rows, rows:rows.length});
    // 응답 => 렌더링
    // if (err) {
    //   res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    //   res.end("<script>alert('정보 가져오기 실패. 잠시 후 다시 이용해주세요.');history.back();</script>");
    // } else if (rows.length == 0) {
    //   res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    //   res.end("<script>alert('검색 결과가 없습니다.');history.back();</script>");
    // } else {
    //   res.json({code:1, keyword:searchKeyword, results:rows});
    // }
  });
  // rows가 전달됨 => json 으로 응답
  // res.json({'code':'111','keyword':req.body.keyword});
});

// URL : /main/teams/:id
router.get('/team/:id', function(req, res, next) {
  db7.getEplHomepage({id:req.params.id}, function(err, rows) {
    if (err || rows.length == 0) {
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.end("<script>alert('홈페이지 없습니다.');history.back();</script>");
    } else {
      res.redirect (rows[0].homepage);
    }
  });
  // res.send("동적 파라미터 값 : "+ req.params.id);
});

router.post('/upload', (req, res, next) => {
  console.log('=========================================');
  console.log('=========================================');
  console.log('upload');
  console.log('=========================================');
  console.log('=========================================');
  // 저장 경로
  var infos = {};

  var replacedDirName = __dirname.replace(/\\/gi, '/');
  console.log('------------------ __dirname');
  console.log(replacedDirName);
  // 저장 경로
   var dir = path.join(replacedDirName.replace('/routes/controller', ''), '/public/upload');
   console.log('---------------- dir');
   console.log(dir);
  // 폼 생성
  var form = new multiparty.Form( {
    maxFields:10
    // uploadDir:dir
  });

  // 이벤트 등록 ==========================
  form.on('field', (name, value) => {
    infos[name] = value;
    console.log("field : ", name, value)
  });
  // form.on('file', (name, file) => {
  //
  //   infos[name] = file.path.replace(path.join(replacedDirName.replace('/routes/controller', '') + "/", 'public'), '');
  //   console.log("저장 파일 경로 : ", infos[name]);
  // });
  form.on('close', () => {
    // 파일 업로드에 대한 응답
    // 파일 경로/파일명을 기록 => infos에 전달 된 데이터들을 DB에 기록한다.

  });
  form.on('part', (part) => {
    // 파일을 저장하기
    // 파일의 이름, 크기를 획득
    var filename;
    var size;
    if (part.filename) {
      filename = part.filename;
      size = part.byteCount;
    } else {
      part.resume();
    }
    // 서버의 특정 공간에 파일을 생성 => fs(파일시스템)
    // 스트림을 생성, (저장 위치까지 연결) => v파이프라인 연결
    var wStream = fs.createWriteStream(path.join(dir, filename));
    wStream.filename = filename;

    // part에서 파일까지 스트림을 연결시킨다. part는 네트워크를 타고 클라이언트 브라우저와 연결(TCP)
    part.pipe(wStream);
    // 읽어지는대로 파이프 라인을 따라서 기록이 된다.
    part.on('data', (chunk) => {
      console.log( filename + '를 읽어서 쓰고 있다. - ' + chunk.length + " byte");
    })
    // end 이벤트가 발생하면 읽어서 파일에 기록하는 전체 공정이 마무리 된다. => 스트림을 닫는다.
    part.on('end', () => {
      console.log("파일 읽기 완료");
      // 파일 닫기
      wStream.close();
    });
  });
  form.on('progress', (read, expected) => {
    // 진행률
    console.log("읽은 데이터 로그 : ", read, expected);
  });
  form.on('error', (err, fields, files) => {
    console.log("에러 : " + err);
  });
  // 파싱 ===========================
  form.parse(req, (error, fields, files) => {
    console.log("파싱 : ", error, fields, files);
  });
});

router.isEmpty = ( value ) => {
  if (value == 'null' || typeof(value) === 'undefined' || value == ''
      || value == null || value == undefined
      || (value != null && typeof value == "object" && !Object.keys(value).length )) {
    return true;
  } else {
    return false;
  }
}

// 객체 모듈화
module.exports = router;
