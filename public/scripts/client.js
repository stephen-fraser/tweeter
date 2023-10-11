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

  // Later changed this over to the CSS side

  // //shadow box for tweets upon mouseenter and mouseleave
  // $('.tweet-container').on ('mouseenter', '.border-tweets', function () {
  //   $(this).css("box-shadow", "5px 5px 5px #555")
  // } )

  // $('.tweet-container').on ('mouseleave', '.border-tweets', function () {
  //   $(this).css("box-shadow", "0px 0px 0px #555");
  // })

  // //icon highlights upon mouseenter and mouseleave
  // $('.tweet-container').on ('mouseenter','.posted-footer-icons', function () {
  //   $(this).addClass('highlight-icon');
  // })

  // $('.tweet-container').on ('mouseleave','.posted-footer-icons', function () {
  //   $(this).removeClass('highlight-icon');
  // })  

  // test driver data for tweets
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  // function to created the HTML tweet elements (already styled with CSS)
  const createTweetElement = function (tweet) {

    const user = tweet.user;
    const content = tweet.content;

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
          <p>${tweet.created_at}</p>
          <div class="posted-footer-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>  
        </div>
      </div>
      `
      return $tweet;
    }

  // function to render the tweets once they have been created 
  // with the create tweet element funciton 
  const renderTweets = function(tweets) {

    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet)
      $('.tweet-container').append($tweet)
    }
  }

  renderTweets(data)

  $(".tweet-form").on("submit", function(event) {

    event.preventDefault();

    console.log( $(this).serialize());

  })

});

