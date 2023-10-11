/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //When we are using dynamic generation of HTML elements with jQuery, we cannot use 
  //the elements directly for event capturing. So that's why we use a parent container
  //and then use the event on the actual element within that container. This is because 
  //dynamic elements are not loaded till the DOM is loaded and the events are not registered.

  //shadow box for tweets upon mouseenter and mouseleave
  $('.tweet-container').on ('mouseenter', '.border-tweets', function () {
    $(this).css("box-shadow", "5px 5px 5px #555")
  } )

  $('.tweet-container').on ('mouseleave', '.border-tweets', function () {
    $(this).css("box-shadow", "0px 0px 0px #555");
  })

  //icon highlights upon mouseenter and mouseleave
  $('.tweet-container').on ('mouseenter','.posted-footer-icons', function () {
    $(this).addClass('highlight-icon');
  })

  $('.tweet-container').on ('mouseleave','.posted-footer-icons', function () {
    $(this).removeClass('highlight-icon');
  })  

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

  // const $tweet = $(`<article class="tweet">Hello world</article>`);
  // console.log($tweet)
  // $('.tweet-container').append($tweet);

  const createTweetElement = function (tweetData) {

    const user = tweetData.user;
    const content = tweetData.content;

    let $tweet = `
      <div class="border-tweets">
        <div class="posted-header">
          <div class="posted-header-left">
            <img class="reduce-image-size" src="${user.avatars}">
            <p>${user.name}</p>
          </div>
            <p class="posted-header-right">${user.handle}</p>
        </div>
        <div class="posted-body">
          <p>${content.text}</p>
        </div>
        <div class="posted-footer">
          <p>${tweetData.created_at}</p>
          <div>
            <i class="fa-solid fa-flag posted-footer-icons"></i>
            <i class="fa-solid fa-retweet posted-footer-icons"></i>
            <i class="fa-solid fa-heart posted-footer-icons"></i>
          </div>  
        </div>
      </div>
      `
      return $tweet;
    }

  const $tweet = createTweetElement(tweetData);

//   // // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('.tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});

