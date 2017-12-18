$(document).ready(function () {

    var coinButtons = ["bitcoin", "litecoin", "ethereum", "monero"];
    function renderButtons() {
        //clear buttons 
        $("#btn-div").empty();
        //loop to create buttons
        for (var i = 0; i < coinButtons.length; i++) {
            console.log(coinButtons[i])
            //button variable
            var buttons = $("<button>");
            //button attributes
            buttons.attr("data-name", coinButtons[i]);
            buttons.addClass("coin-btn");
            buttons.text(coinButtons[i]);
            $("#btn-div").append(buttons);
        }
    }
    renderButtons();
    //make buttons do stuff
    $(document).on("click", ".coin-btn", function () {
        $("#images").empty();        
        textBtn = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + textBtn + "&rating=pg&limit=10&api_key=dc6zaTOxFJmzC";
        //link gifs to buttons

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            //adds search result to images div
            var result = response.data

            //sort through results api response
            for (var i = 0; i < result.length; i++) {
                //dynamically create div inside of images
                var resultDiv = $("<div>");
                //pull rating from object
                var p = $("<p>").text("Rating: " + result[i].rating);

                var resultImage = $("<img>");

                resultImage.attr("src", result[i].images.fixed_height_still.url);
                resultImage.attr("status", "still");
                resultImage.attr("still", result[i].images.fixed_height_still.url)
                resultImage.attr("animated", result[i].images.fixed_height.url)
                resultImage.addClass("crypto-gifs");
                resultDiv.append(p);
                resultDiv.append(resultImage);

                $("#images").append(resultDiv);
            }
        })
    });
    $("#submit").on("click", function (event) {
        event.preventDefault();
        var currency = $("#crypto-search").val().trim();
        console.log(currency);
        coinButtons.push(currency);
        renderButtons();
    })

    $(document).on("click", ".crypto-gifs", function () {
        if ($(this).attr("status") == "still") {

            $(this).attr("src",$(this).attr("animated"));
            $(this).attr("status", "animated");
        }
        else {
            $(this).attr("src",$(this).attr("still"));
            $(this).attr("status", "still");
        }
    });
    
    //adds gifs to clicking dynamic buttons

});