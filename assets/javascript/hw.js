var gifTopics = ["pizza", "sushi", "hamburger", "bubble tea", "soup", "fried rice"];
var gifObject;

$(document).ready(function() {

    for (var i = 0; i < gifTopics.length; i++) {
        var buttonTag = $("<button>");
        buttonTag.attr("value", gifTopics[i]);
        buttonTag.html(gifTopics[i]);
        $("#gif-buttons").append(buttonTag);
    };

    $("#add-gif").on("click", function() {
        gifInput = $("#gif-input").val();
        if (gifInput !== "") {
            var buttonTag = $("<button>");
            buttonTag.attr("value", gifInput);
            buttonTag.html(gifInput);
            $("#gif-buttons").append(buttonTag);
            $("#gif-input").val("");
        };
    });

    $("#gif-buttons").on("click","button",function() {
        $("#gifs").empty();
        var gifTopic = $(this).attr("value");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifTopic + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            gifObject=response;
            for (var i = 0; i < response.data.length; i++) {
                var gifDiv =$("<div id='gif-img-div' class='col-xs-3 col-md-3'>");
                var imgTag = $("<img id='gif-img' class='col-xs-12 col-md-12' index="+i+" value='still'>");
                var pTag=$("<p id='rating-div' class='col-xs-3 col-md-3'>")
                var rating = response.data[i].rating;
                imgTag.attr("src",response.data[i].images.downsized_still.url);
                pTag.append("Rating:"+rating);
                gifDiv.append(pTag);
                gifDiv.append(imgTag);
                $("#gifs").append(gifDiv);
            }
        });

    });


    $("#gifs").on("click","img",function(){
        var imgIndex = $(this).attr("index");
        if($(this).attr("value")==="still"){
            $(this).attr("src",gifObject.data[imgIndex].images.downsized.url)
            $(this).attr("value","animated");
        } else if(($(this).attr("value")==="animated")){
            $(this).attr("src",gifObject.data[imgIndex].images.downsized_still.url)
            $(this).attr("value","still");
        }

    });
});