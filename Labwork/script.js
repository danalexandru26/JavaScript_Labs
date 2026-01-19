$(document).ready(function () {
    $.getJSON("spaceships.json", function (data) {

        let container = $("#spaceshipContainer");

        $.each(data.spaceships, function (key, spaceship) {
            // Create real elements, not strings
            let columnAlign = $("<div>").addClass("col-md-4");
            let card = $("<div>").addClass("card mb-4 box-shadow");
            let cardBody = $("<div>").addClass("card-body");

            let shipName = $("<p>").addClass("card-text").text("Name: " + spaceship.name);
            let shipType = $("<p>").addClass("card-text").text("Type: " + spaceship.type);
            let shipPurpose = $("<p>").addClass("card-text").text("Captain: " + (spaceship.crew.captain.name || "No purpose"));


            cardBody.append(shipName);
            cardBody.append(shipType);
            cardBody.append(shipPurpose);
            card.append(cardBody);
            columnAlign.append(card);
            container.append(columnAlign);
        });
    });
});
