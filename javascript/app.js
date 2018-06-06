
var topics = ["Morrissey", "Robert Smith", "Jeff Buckley", "Thom Yorke", "Matt Berninger", "Conor Oberst", "Sufjan Stevens","Sylvia Plath", "Ian Curtis", "Neutral Milk Hotel"]



function createButtons () {
    $("#sad-bastard-buttons").empty();

    for (var i = 0; i < topics.length; i++) {

        var saddestButton = $("<button>");

        saddestButton.addClass("bastard");

        saddestButton.attr("data-name", topics[i]);

        saddestButton.text(topics[i]);

        $("#sad-bastard-buttons").append(saddestButton);

      }
    reloadOnClick();
    }


function addNewButton () {
    
    var addInput = $("#sad-input").val();
    console.log(addInput)

    topics.push(addInput);
    createButtons();
}




function reloadOnClick(){



$(".bastard").on("click", function () {
    var sadBastard = $(this).attr("data-name").replace(" ", "_");
    
    console.log(sadBastard)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        sadBastard + "&api_key=dc6zaTOxFJmzC&limit=10";

        console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            console.log(response);
       
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {

                var sadDiv = $("<div>");

                var sadImage = $("<img>");

                sadImage.attr("src", results[i].images.fixed_height.url)
                sadImage.attr("data-animate", results[i].images.fixed_height.url)
                sadImage.attr("data-still", results[i].images.original_still.url, results[i].images.fixed_height.url)


                sadImage.attr("data-state", "animate");

                sadImage.on("click", function() {

                    var state = $(this).attr("data-state");
                  
                    if (state === "still") {
                      $(this).attr("src", $(this).attr("data-animate"));
                      $(this).attr("data-state", "animate");
                    } else {
                      $(this).attr("src", $(this).attr("data-still"));
                      $(this).attr("data-state", "still");
                    }
                  });
    

                sadDiv.append(sadImage);

                $("#sad-gifs-here").prepend(sadDiv);

            
            }








        });

        
});
}
createButtons();



$("#add-sad").on("click", function () {
    event.preventDefault();
    addNewButton();
    reloadOnClick();


});






