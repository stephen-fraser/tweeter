$(document).ready(function() {

  $('#tweet-text').on ('input', function () {
  console.log($(this).val().length)
 
    const inputText = $(this).val().length;
    const charCount = $(this).closest('.tweet-form').find('.counter');

    if (inputText > 140) {
      charCount.text(140 - inputText).addClass('invalid');
    } else {
      charCount.text(140 - inputText).removeClass('invalid');
    }

  })
});