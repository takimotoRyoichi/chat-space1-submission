$(document).on('turbolinks:load', function() {
  function buildSendMessageHTML(message){
    var image = (message.image.url) ? `<img src = ${message.image.url} class: "lower-message__image">` : "";
    var html = `<strong>
                  <div class = "message" data-message-id="${message.id}">
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
                  </div>
                </strong>`
  return html;
  }

  function scroll() {
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight})
  }

$(function(){
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
      scroll()
      $('#new_message')[0].reset();
    })

    .fail(function(){
      alert('error');
    })
  })
})
