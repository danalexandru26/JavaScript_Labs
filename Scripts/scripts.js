function sampleCheck() {
    let userInput = document.getElemenetById("slipstreamGate").value;

    if (userInput == null) {
        print("No input was provided.");
        return;
    }

    else if (userInput.length > 1) {
        if (userInput.charAt(0) != 'S' || userInput.charAt(1) != '-') {
            console.log("This slipstream gate is located in the Sol system.");
        }
    }
}

function logData() {
    var userName = document.getElementById("username").value;
    var userPassword = document.getElementById("password").value;
    var protected = document.getElementById("protected").checked;

    if (protected == false) {
        console.log("Username: " + userName + " Password: " + userPassword);
    }
    else {
        console.log("The user is protected.");
    }
}

function setInnerPreformat() {
    var preformatTag = document.getElementById("codePreformat");

    preformatTag.innerHTML = "<span style='color:blue;'>var</span> name = 'Lucky';";

    if (!preformatTag.innerHTML.includes("var")) {
        console.log("The innerHTML was not set correctly.");
    }
}

function alertMessage() {
    window.alert("Remember to drink water!");
}