function syntaxBlock() {
    let a = 10;
    let b = 20;

    var c = 10;
    var d = 20;

    let sum = a + b;
    var product = c * d;

    console.log("Sum: " + sum);
    console.log("Product: " + product);

    let myName = "Explorer";

    if (myName === "Explorer") {
        var greeting = "Welcome, Explorer!";
        console.log(greeting);
    }

    //The following line is a string literal
    "Bella";

    //The following line is a numeric literal
    10;
}

function declarations() {
    var global = 5;

    let blockScoped = 10;

    {
        var global = 15; // This will overwrite the previous global variable
    }

    const constantValue = 50;

    console.log("Global variable: " + global);
    console.log("Block scoped variable: " + blockScoped);
    console.log("Constant value: " + constantValue);
}

function typeDeclaration() {
    let isActive = true;
    let userName = "StarTraveler";
    let userScore = 1500;

    var userData = { level: 5, experience: 3000 };
    {
        console.log("Is Active: " + isActive);
        console.log("User Name: " + userName);
        console.log("User Score: " + userScore);
        console.log("User Data: Level - " + userData.level + ", Experience - " + userData.experience);
    }

    const piValue = 3.14159;
    console.log("Value of Pi: " + piValue);
    console.log("This variable cannot be reassigned.");

    let arrayExample = [1, 2, 3, 4, 5];
    console.log("Array Example: " + arrayExample.join(", "));

    for (let i = 0; i < arrayExample.length; i++) {
        console.log("Element " + i + ": " + arrayExample[i]);
    }

    class SpaceShip {
        constructor(name, speed) {
            this.name = name;
            this.speed = speed;
        }
    }
    let myShip = new SpaceShip("Galaxy Cruiser", "Warp 5");
    console.log("SpaceShip Name: " + myShip.name + ", Speed: " + myShip.speed);

    let undefinedVariable;
    console.log("Undefined Variable: " + undefinedVariable);

}