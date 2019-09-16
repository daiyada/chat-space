$(function(){

  function buildMessageHTML(message) {
      var img = message.image.url != null ? `<img src = "${message.image.url}", class= "chat-main__messages__box__bottom__image"></img>` : ``;
      var html = `<div class= "chat-main__messages__box" data-id= ${message.id}>
                    <div class= "chat-main__messages__box__top">
                      <div class= "chat-main__messages__box__top__user">
                        ${message.user_name}
                      </div>
                      <div class= "chat-main__messages__box__top__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class= "chat-main__messages__box__bottom">
                      <div class= "chat-main__messages__box__bottom__text">
                        ${message.content}
                      </div>
                      ${img}
                    </div>
                  </div>
                  `
    return html;
  }

  $("#new_message").on("submit",function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessageHTML(message);
      $(".chat-main__messages").append(html);
      $(".chat-main__messages").animate({scrollTop: $('.chat-main__messages')[0].scrollHeight}, 'fast');
      $(".new_message__right").prop("disabled", false);
      $("#new_message")[0].reset();
    })
    .fail(function(){
      alert("エラー");
    })
  })

  var reloadMessages = function() {
    var last_message_id = $(".chat-main__messages__box:last").data("id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {last_id: last_message_id}
    })
    .done(function(messages) {
      messages.forEach(function(message){
        var insertHTML = buildMessageHTML(message);
        $(".chat-main__messages").append(insertHTML);
      })
      $(".chat-main__messages").animate({scrollTop: $('.chat-main__messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert("自動更新が出来ていません。");
    });
  };
  if(location.href.match("/groups/\\d+/messages")){
    setInterval(reloadMessages, 5000);
  }
})