$(function(){
  var search_list = $("#user-search-result");

  function searchMember(user){
    console.log(user.name);
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name="ユーザー名">追加</div>
                </div>`
    search_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<li>
                  <div class="chat-group-user__name">${ msg }</div>
                </li>`
    search_list.append(html);
  }
  
  $("#user-search-field").on("keyup",function() {
    var input = $("#user-search-field").val();

    $.ajax({
      url: "/users",
      type: "GET",
      data: { keyword: input },
      datatype: "json"
    })

    .done(function(users){
      console.log(users);
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          searchMember(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーがいません");
      }
    })
    .fail(function(){
      console.log("error");
      // alert("ユーザー検索に失敗しました");
    })
  })
})