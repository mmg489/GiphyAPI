$(document).ready(function () {

    //GLOBAL VARIABLES 
    //_____________________________________________
    var topics = ["TLC", "Nirvana", "Pearl Jam", "NSYNC", "Backstreet Boys", "Spice Girls", "Aerosmith",
    "Janet Jackson", "No Doubt", "Michael Jackson", "Bon Jovi", "Britney Spears", "Boyz II Men", "2Pac"];


    //FUNCTIONS
    //_______________________________________________

    //Creating a Button for the bands array 
    function createButton() {
        //clear
        $("#button").empty();

        //loop through array, and append to html
        for (var i = 0; i < topics.length; i++) {
            //adding a button for each array option, and adding class, text and attr
            var sOption = $("<button>")
            sOption.addClass("treat");
            sOption.attr("data-name", topics[i]);
            sOption.text(topics[i]);
            //adding to html
            $("#button").append(sOption);
        }

    }


    //To display gifs 
    function showGifs() {
        $('#images').empty();
        //api url and api key held in var
        var music = $(this).attr("data-name");
        var apiKey = "YrvBw0K8qd3821iWjFt8brLmU0XmVDjJ";
        var limitOf = 10;
        var fullUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + music + "&limit=" + limitOf + "&offset=0&lang=en";

        //Ajax linked
        $.ajax({
            url: fullUrl,
            method: 'GET'
        }).done(function (response) {
            //checking to see if link is connected 
            console.log(response.data);
            var results = response.data;

            //loop through each gif 
            for (var i = 0; i < results.length; i++) {
                //create div, with class and set to img
                var gifDiv = $("<div class=treats>");
                var showTreat = $("<img>");
                //pull the images held in API object
                showTreat.attr('src', results[i].images.fixed_height_still.url);
                showTreat.attr("data-still", results[i].images.fixed_height_still.url);
                showTreat.attr('data-animate', results[i].images.fixed_height.url);
                showTreat.attr("data-state", "still");
                //add class to gif image
                showTreat.addClass('gif');
                //add to html
                gifDiv.append(showTreat)

                //set rating variable 
                var rating = results[i].rating;
                //add p tag, and stor rating in then append to html
                var gifRating = $("<p>").text("Rating: " + rating);
                gifDiv.append(gifRating)

                $("#images").prepend(gifDiv);

            }
        })

    }

    //Animate gif images 
    $(document).on('click', '.gif', function () {

        var state = $(this).attr('data-state');
        //if the image is still, then animate the image src, and change attr state to animate 
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
            //otherwise, switch it to still
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    })


    //add a new button for gif topic
    $("#submitButton").on("click", function () {
        //store input in var
        var sweet = $("#userinput").val().trim();
        //push into topic array
        topics.push(sweet)
        //resets the input to empty for new 
        form.reset();
        //call function to create button
        createButton()

        //enter
        return false;
    })


    //PROCESSES 
    //_________________________________________________

    //calling the functions on click

    $(document).on("click", ".treat", showGifs);


    createButton()


})

