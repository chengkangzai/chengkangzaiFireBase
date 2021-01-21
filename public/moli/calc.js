function howMuchHave() {
    const num = $("#calcInput").val();
    const level = $("#calcLevelInput").val();
    let temp;
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
    const num = $("#numInput").val();
    const color = $("#colorForNum :selected").val();
    let temp;

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

    $("#numOutput").replaceWith(`<p id="numOutput">${temp}</p>`)
}
