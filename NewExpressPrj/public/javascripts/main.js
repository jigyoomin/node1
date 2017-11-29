// 문서가 준비되었다.
// HTML 이 DOM(Document Object Model) 으로 메모리에 로드 되었다.
// DOM 조작을 할 수 있다.
$(document).ready(function() {
  $('#searchForm').on('submit', function(e) {
    e.preventDefault();

    // ajax 통신
    $.ajax({
      url:'/main/search',
      data:$('#searchForm').serialize(),
      dataType:'json',
      type:'post',
      success:function(data) {
        console.log(data);
        $('input[name=keyword]').val('');
        if (data.err) {
          alert('시스템 오류입니다. 잠시후에 다시 이용해주세요.');
          $('input[name=keyword]').val('');
        } else {
          // 검색어 표현
          $('#searchView h3 strong').empty();
          $('#searchView h3 strong').append ("검색어 : " + data.keyword);
          // 검색 개수 표현
          $('#rowsCnt').empty();
          $('#rowsCnt').append("(" + data.rows +" 건)");
          // 검색 창 보이게 해야함
          $('#searchView').css('display', 'block');

          $('#wfootballTeamRecordBody>table>tbody').empty();
          if (data.rows > 0) {
            $.each(data.results, function(idx, item) {
              console.log(item);
              var html =
              "<tr>"+
"              <td class='num best'>"+
"            <div class='inner champsLeague'>"+
"                <strong>"+item.rank+"</strong>"+
"            </div>"+
"        </td>"+
"        <td class='align_l'>"+
"            <div class='inner'>"+
"                <span class='name'>"+item.name+"</span>"+
"            </div>"+
"        </td>"+
"        <td>"+
"            <div class='inner'>"+
"                <span>"+item.total+"</span>"+
"            </div>"+
"        </td>"+
"        <td class='selected'>"+
"            <div class='inner'>"+
"                <span>"+item.winPoint+"</span>"+
"            </div>"+
"        </td>"+
"        <td>"+
"            <div class='inner'>"+
"                <span>"+item.win+"</span>"+
"            </div>"+
"        </td>"+
"        <td>"+
"            <div class='inner'>"+
"                <span>"+item.draw+"</span>"+
"            </div>"+
"        </td>"+
"        <td>"+
"            <div class='inner'>"+
"                <span>"+item.lose+"</span>"+
"            </div>"+
"        </td>"+
"        <td>"+
"            <div class='inner'>"+
"                <span>"+item.goals+"</span>"+
"            </div>"+
"        </td>"+
"        <td>"+
"            <div class='inner'>"+
"                <span>"+item.eat+"</span>"+
"            </div>"+
"        </td>"+
"        <td>"+
"            <div class='inner'>"+
"                <span>"+item.diff+"</span>"+
"            </div>"+
"        </td>"+
"    </tr>";

              $('#wfootballTeamRecordBody>table>tbody').append(html);
              $('#wfootballTeamRecordBody>table>tbody>tr:last').on('click', function() {
                location.href="/main/team/" + item.id;
              });
            });
          }
        }
      },
      error:function(err) {
        console.log("오류", err);
      }
    });


    return false;
  });
});
