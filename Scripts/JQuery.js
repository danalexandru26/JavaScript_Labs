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

function sAppend() {
    let plainText = "This is a dynamically generated paragraph content";
    $("#expandParagraph").append(plainText);
}

function sPrepend() {
    let plainText = "This content is prepended to the selected paragraph";
    $("#expandParagraph").prepend(plainText);

}

function sAfter() {
    let plainText = "This content is inserted after the selected paragraph";
    $("#expandParagraph").after(plainText);

}

function sBefore() {
    let plainText = "This content is inserted before the selected paragraph";
    $("#expandParagraph").before(plainText);
}

function appendN() {
    let tag = "<p>Static paragraph.</p>";
    let plainContent = "This is a dynamically generated paragraph";

    let tag2 = $("<p></p>").text("JQuery is so cool");

    let tag3 = document.createElement("p");
    tag3.innerHTML = plainContent;

    $("body").append(tag, tag2, tag3);
}

function afterN() {
    let tag = $("<em></em>").text("Use JQuery, it's easier.");

    $("#samplePara").after(tag);

}

function removeElement() {
    $("body").remove();
}

function emptyElement() {
    $("body").empty();
}