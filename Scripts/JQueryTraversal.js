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

