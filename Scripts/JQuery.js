$(document).ready(function () {
    console.log("jQuery has loaded!");

    $("#exampleButton").click(function () {
        $("#JQpara").toggle();
        $(this).text(function (_, currentText) {
            return currentText === "Hide Paragraph" ? "Show Paragraph" : "Hide Paragraph";
        });
    });
});
