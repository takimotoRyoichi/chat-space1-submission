$(document).on('turbolinks:load', function() {
  function buildSendMessageHTML(message){
    var image = (message.image === null) ? "" : `<img src="${message.image}" class="lower-message__image">`
    var html = `<div class = "message" data-message-id="${message.id}">
                  <div class = "upper-message">
                    <div class = "upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`
  return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message) {
      var html = buildSendMessageHTML(message);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $(`.textbox`).val('');
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })

    .fail(function(){
      alert('error');
    })
    .always(function() {
      $('.form__submit').prop('disabled',false);
    })

    function update(){
    var lastMessageId = $('.message').last().data('message_id');
    var pathname = location.pathname;

    $.ajax({
      url: pathname,
      type: 'GET',
      data: { message: lastMessageId},
      dataType: 'json'
    })

    .done(function(data){
      data.forEach( function(new_message){
      var html = buildHTML(new_message);
      $('.messages').append(html);
      })
    });
  }

    setInterval(update, 5000);
  })
});


