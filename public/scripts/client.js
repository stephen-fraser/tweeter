/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

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
          <p>${escape(content.text)}</p>
        </div>
        <div class="posted-footer">
          <p>${timeago.format(tweet.created_at)}</p>
          <div class="posted-footer-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>  
        </div>
      </div>
      `;
    return $tweet;
  };

  const escape = (someString) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(someString));
    return div.innerHTML;
  };

  // function to render the tweets once they have been created with the create tweet element function 
  const renderTweets = function (tweets) {
    // loop through tweets and use createTweetElement function to render in the correct mark up
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweet-container').prepend($tweet);
    }
  };

  // GET request function to loadTweets 
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      type: "GET",
      dataType: "json"
    }).then((tweets) => {
      renderTweets(tweets);
    }).catch((err) => {
      console.log(err);
    });
  };


  // POST request upon event listener submit with validation
  $(".tweet-form").on("submit", function (event) {

    event.preventDefault();

    $("#error-message").hide();
    $("#error-message").empty();

    if (!$("#tweet-text").val()) {
      $("#error-message").append('<i class="fa-solid fa-triangle-exclamation"></i>You cannot post an empty tweet<i class="fa-solid fa-triangle-exclamation"></i>').show();
    } else if ($("#tweet-text").val().length > 140) {
      $("#error-message").append('<i class="fa-solid fa-triangle-exclamation"></i>Oops, your tweet cannot exceed 140 characters<i class="fa-solid fa-triangle-exclamation"></i>').show();
    } else {

      $.ajax({
        url: "/tweets",
        type: "POST",
        data: $(this).serialize()
      }).then(() => {
        // $('.tweet-container').empty();
        $("#tweet-text").val("");
        loadTweets();
      }).catch((err) => {
        console.log(err);
      });
    }
  });


  loadTweets();

});

