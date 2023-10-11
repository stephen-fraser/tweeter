/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //shadow box for tweets upon mouseenter and mouseleave
  $('article').on ('mouseenter', function () {
    $(this).css("box-shadow", "5px 5px 5px #555")
  } )

  $('article').on ('mouseleave', function () {
    $(this).css("box-shadow", "0px 0px 0px #555");
  })

  //icon highlights upon mouseenter and mouseleave
  $('.posted-footer-icons').on ('mouseenter', function () {
    $(this).addClass('highlight-icon');
  })

  $('.posted-footer-icons').on ('mouseleave', function () {
    $(this).removeClass('highlight-icon');
  })  

  const createTweetElement = function () {

    const $tweet = $(`<article class="tweet">Hello world</article>`);

  }

  // Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});

