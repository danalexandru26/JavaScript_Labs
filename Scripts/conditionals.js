function sampleConditionals() {
    let nameA = "Bella";
    let nameB = "Charlie";

    if (nameA === nameB) {
        console.log("The content of these two variables is identical.");
    }

    if (nameA == null) {
        console.log("nameA is null.");
    }
    if (nameB == null) {
        console.log("nameB is null.");
    }

    let score = 85;

    if (score >= 90) {
        console.log("Grade: A");
    }
    else if (score >= 80) {
        console.log("Grade: B");
    }
    else if (score >= 70) {
        console.log("Grade: C");
    }
    else if (score >= 60) {
        console.log("Grade: D");
    }
    else {
        console.log("Try again next year!");
    }

    switch (score) {
        case 90:
            console.log("Excellent work!");
            break;
        case 80:
            console.log("Good job!");
            break;

        case 70:
            console.log("You passed.");
            break;
        case 60:
            console.log("Barely made it.");
            break;
        default:
            console.log("Failed.");
            break;
    }
}