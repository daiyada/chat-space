$(function(){

  function sendMessage(message){
      if (message.image.url != null){
        var html_i = `<div class="chat-main__messages__box__bottom">
                        <img class="l.chat-main__messages__box__bottom__image" src= ${message.image.url}>
                        </img>
                      </div>`
      } else {
        var html_i =``
      }
      var html_m = `<div class="chat-main__messages__box">
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
                        ${html_i}
                    </div>
                  </div>`
      return html_m;
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
      var html_m = sendMessage(message);
      $(".chat-main__messages").append(html_m);
      $("#message_content").val(" ")
      $(".chat-main__messages").animate({scrollTop: $('.chat-main__messages')[0].scrollHeight}, 'fast');
      $(".new_message__right").prop("disabled", false);
      $("#new_message")[0].reset();
    })
    .fail(function(){
      alert("エラー");
    })
  })
})