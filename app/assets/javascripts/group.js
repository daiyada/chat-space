$(function(){
  var search_list = $("#user-search-result");

  function searchMember(user){
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

  function attendMember(increName, increId){
    html_d = `<div class='chat-group-user'>
                <input name='group[user_ids][]' type='hidden' value=${increId}>
                <p class='chat-group-user__name'>${increName}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
    return html_d;
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
      $("#user-search-result").empty();

      if (users.length !== 0 && input.length !== 0) {
        users.forEach(function(user){
          searchMember(user);
        })
      }
      else {
        appendErrMsgToHTML("一致するユーザーがいません");
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  })

  $(document).on("click",".chat-group-user__btn.chat-group-user__btn--add",function(e){
    var selectName = $(this).parent().find("p").text();
    var selectId = $(this).attr("data-user-id");

    var html_d = attendMember(selectName, selectId);
    $(".chat-group-users.js-add-user").append(html_d);
    $(this).parent().remove();
  })

    $(document).on("click",".user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn",function(e){
    $(this).parent().remove();

    })
})