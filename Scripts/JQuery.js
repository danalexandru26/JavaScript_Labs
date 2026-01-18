$(document).ready(function () {
    console.log("jQuery has loaded!");

    $("#exampleButton").click(function () {
        $("#JQpara").toggle();
        $(this).text(function (_, currentText) {
            return currentText === "Hide Paragraph" ? "Show Paragraph" : "Hide Paragraph";
        });
    });
});

$(document).ready(function () {
    console.log("jQuery has loaded!");
    $("#paraTest").click(function () {
        alert("The paragraph has the following text: " + $("#paraTest").text());
    });
});

$(document).ready(function () {
    $("#genericID").click(function () {
        $("#genericChild").text(function (id, oldText) {
            return oldText + "is deprecated";
        });
    });
});
