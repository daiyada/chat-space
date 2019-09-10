$(function(){

  function sendMessage(message){
    var html = `<div class="chat-main__messages__box">
                  <div class="chat-main__messages__box__top">
                    <div class="chat-main__messages__box__top__user">
                      ${message.user_name}
                    </div>
                    <div class="chat-main__messages__box__top__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="chat-main__messages__box__bottom">
                    <div class="chat-main__messages__box__bottom__text">
                      ${message.content}
                    </div>
                  </div>
                 </div>`
    return html;
  }

  $("#new_message").on("submit",function(e){
    e.preventDefault();
    console.log(this);
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
      var html = sendMessage(message);
      $(".chat-main__messages").append(html);
      $("#message_content").val(" ")
    })
    .fail(function(){
      alert("エラー");
    })
  })
})