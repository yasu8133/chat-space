$(function(){
  function buildHTML(message){
    if (message.image) {
      let html = 
        `<div class="MessageBox" data-message-id=${message.id}>
          <div class="Message__member">
            <div class="Message__member_username">
              ${message.user_name}
            </div>
            <div class="Message__member_date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message__member_content">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__member_content__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html = 
      `<div class="MessageBox" data-message-id=${message.id}>
        <div class="Message__member">
          <div class="Message__member_username">
            ${message.user_name}
          </div>
          <div class="Message__member_date">
            ${message.created_at}
          </div>
        </div>
        <div class="Message__member_content">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }
  $('.Form').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Message').append(html);
      $('form')[0].reset();
      $('.Message').animate({ scrollTop: $('.Message')[0].scrollHeight});
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.submit-btn').prop("disabled", false);
    });
  });
  
});