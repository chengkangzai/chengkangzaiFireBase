function howMuchHave() {
    var num = $("#calcInput").val();
    var level = $("#calcLevelInput").val();
    var temp;
    switch (level) {
        case "1":
            temp = num / 5;
            break;
        case "2":
            temp = num / (5 * 5)
            break;
        case "3":
            temp = num / (5 * 5 * 5)
            break;
        case "4":
            temp = num / (5 * 5 * 5 * 5)
            break;
        case "5":
            temp = num / (5 * 5 * 5 * 5 * 5)
            break;
    }

    $("#calcOutput").replaceWith(`<p id="calcOutput">${temp}</p>`);
}

function calc() {
    var num = $("#numInput").val();
    var color = $("#colorForNum :selected").val();
    var temp;

    switch (color) {
        case 'blue':
            temp = num * 5 * 5;
            break;

        case 'purple':
            temp = num * 5 * 5 * 5;
            break;

        case 'orange':
            temp = num * 5 * 5 * 5 * 5;
            break;

        default:
            console.log(`Error! ${color} was passed int`);
            break;
    }

    $("#numOutput").replaceWith(`<p id="numOutput">${temp}</p>
    `)
}