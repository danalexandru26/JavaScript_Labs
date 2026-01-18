function parentTraversal() {
    $(document).ready(function () {
        let parent = $("#childParagraph").parent();
        let parentsList = $("#childParagraph").parents();
        let parentsUntil = $("#childParagraph").parentsUntil("div");

        console.log(parent);

        for (let i = 0; i < parentsList.length; i++) {
            console.log(parentsList[i]);
        }

        for (let i = 0; i < parentsUntil.length; i++) {
            console.log(parentsUntil[i]);
        }
    });
}

function childTraversal() {
    $(document).ready(function () {
        let childrenList = $("#introduction").children();
        let checkChild = $("#introduction").find("p");

        console.log("Children: " + childrenList);

        if (checkChild.length) {
            console.log("Found the child(ren)");
        }
        else {
            console.log("No such children have been found");
        }
    });
}