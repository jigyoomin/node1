
/*
 * GET home page.
 */

exports.index = function(req, res){
    // res.render()
    // index.ejs 파일을 찾아 읽어서, 데이터를 전달하여 동적으로 응답 데이터를 구성하여 응답한다.
    // 전달하는 구조는 js의 객체 구조로 전달 => 주로 literal 객체 형태를 취함.
    /*
     * 1. obj = {}
     * 2. obj = new Object()
     * 3. function AA() {
     *        ....
     *    }
     * 4. 3번째 방식에 prototype을 적용하여 처리, 생성자 구현
     */
    res.render('index', { title: 'Express' });
};