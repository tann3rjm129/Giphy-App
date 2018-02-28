
$(document).ready( function () {


var starterButtons = ["Family Guy", "South Park", "Archer", "Dragon Ball Z", "Parks and Recreation", "The Office", "Stranger Things", "Game of Thrones", "Rick and Morty", "30 Rock", "Veep", "Portlandia", "House of Cards"];

var newButtons = [];

// button creater function

function buttonCreater() {

	$("#resetButton").append("<button id='clear' class='btn fonts clearButton' style='color: white; background-color: #b0dbd7; border: 1px solid white; float: left;'>Clear</button>")

	for (i=0; i<starterButtons.length; i++) {
		$("#button-div").append("<button class='btn tvShowButtons fonts' style='color: white; background-color: #b0dbd7; border: 1px solid white; float: left;' data-name='"+ starterButtons[i] +"'>"+ starterButtons[i] +"</button>");
	};
};

buttonCreater(starterButtons);

// add button using "submit" function

	$("#newShowButton").on("click", function() {

		newButtons = $("#tvShowInput").val().trim();

		event.preventDefault();
		$("#button-div").append("<button class='btn tvShowButtons fonts'style='color: white; background-color: #b0dbd7; border: 1px solid white; float: left;' data-name='"+ newButtons +"'>"+ newButtons +"</button>");

	});

// When you click the TV Show buttons, the giphy images appear

$("#button-div").on("click", ".tvShowButtons", function() {

// empties previous "gifs" in giphy box
$("#giphy-div").empty();

var tvShow = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ tvShow +"&api_key=LBzJClt2nUnrziIdOPm3XfG6o2JeLlAt&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

      	console.log(response);

      	for (var j=0; j<10; j++) {

// creates div for "p and image" of gif
      		var showDiv = $("<div>");
      		showDiv.addClass("gif-divs");

// text part of "rating"

      		var rating = response.data[j].rating;
      		var p = $("<p>").text("Rating: " + rating);
      		p.addClass("result-text");

// image part of gif

      		var showImage = $("<img>");
      		showImage.attr("src", response.data[j].images.fixed_height_still.url);
      		showImage.attr("data-state", "still");
      		showImage.attr("data-animate", response.data[j].images.fixed_height.url);
      		showImage.attr("data-still", response.data[j].images.fixed_height_still.url);
      		showImage.addClass("result-gifs");

// appending images and rating to showDiv
      		showDiv.append(p);
      		showDiv.append(showImage);

// appending showDiv to html
      		$("#giphy-div").append(showDiv);

      	};

      });

});

// When still image is clicked on, it activates "gif"
$("#giphy-div").on("click", ".result-gifs", function() {

	var state = $(this).attr("data-state");

	if ( state === "still" ) {

		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "ainimate");
	}
	else {

		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}


  });

});

// adds function to clear button
$("#resetButton").on("click", "#clear", function() {

	$("#giphy-div").empty();
});
