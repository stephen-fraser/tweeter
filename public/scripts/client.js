$(document).ready(function () {

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

  // escape function to provent XSS / called above
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

    //required to prevent default submit response
    event.preventDefault();

    $("#error-message").hide();
    $("#error-message").empty();

    //validation checks for empty tweet and tweet exceeding 140 characters
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
        $("#tweet-text").val("");
        $(".counter").text("140");
        loadTweets();
      }).catch((err) => {
        console.log(err);
      });
    }
  });

  loadTweets();

});

