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

  let reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    let last_message_id = $('.MessageBox:last').data("message-id") || 0;
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.Message').append(insertHTML);
        $('.Message').animate({ scrollTop: $('.Message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});