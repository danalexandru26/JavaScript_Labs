function loop() {
    let nameArray = ["Bella", "Charlie", "Daisy", "Max"];

    for (let i = 0; i < nameArray.length; i++) {
        console.log("Name " + (i + 1) + ": " + nameArray[i]);
    }

    let sum = 0;
    let numsArray = [5, 10, 15, 20, 25];
    let index = 0;

    while (index < numsArray.length) {
        sum += numsArray[index];
        index++;
    }

    console.log("Total Sum: " + sum);

    let count = 0;
    let position = 0;
    let positionsArray = [2, 4, 6, 8, 10];

    if (positionsArray.length > 0) {
        do {
            count += positionsArray[position];
            position++;
        } while (position < positionsArray.length);
    }
    console.log("Counted Sum: " + count);

}