/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('article').on ('mouseenter', function () {
    $(this).css("box-shadow", "5px 5px 5px #555")
  } )

  $('article').on ('mouseleave', function () {
    $(this).css("box-shadow", "0px 0px 0px #555");
  })

  $('.posted-footer-icons').on ('mouseenter', function () {
    $(this).addClass('highlight-icon');
  })

  $('.posted-footer-icons').on ('mouseleave', function () {
    $(this).removeClass('highlight-icon');
  })  

});

