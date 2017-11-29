$(document).ready(function() {
  // $('#signupForm').on('submit', function(e) {
  //   e.preventDefault();
  //
  //   // ajax 통신
  //   $.ajax({
  //     url:'/users/signup',
  //     data:$('#signupForm').serialize(),
  //     dataType:'json',
  //     type:'post',
  //     success:function(data) {
  //       console.log(data);
  //       if (data.code == 1) {
  //         location.href="/users/login";
  //       } else {
  //         alert("가입 실패다." + data.result.sqlMessage);
  //       }
  //     },
  //     error:function(err) {
  //       console.log("네트워크 실패.", err);
  //     }
  //   });
  //
  //
  //   return false;
  // });

  $('#modifyForm').on('submit', function(e) {
    e.preventDefault();

    $.ajax({
      url:'/users/modify',
      data:$('#modifyForm').serialize(),
      dataType:'json',
      type:'post',
      success:function(data) {
        console.log(data);
        if (data.code == 1) {
          alert("수정 성공!!");
          location.href="/main";
        } else {
          alert("수정 실패다." + data.result.sqlMessage);
        }
      },
      error:function(err) {
        console.log("네트워크 실패.", err);
      }
    });

    return false;
  });
});
