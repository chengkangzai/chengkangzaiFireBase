$("#input").on('keyup', function() {
    renderOutput()
});
$("#input1").on('keyup', function() {
    renderOutput()
});
$("#bladeInput").on('keyup', function() {
    renderExcel();
});
$("#wordInput").on('keyup', function() {
    renderExcel();
});

function resetAllBox() {
    $("#generateKey").hide();
    $("#generateExcel").hide();
}

function resetAllButton() {
    $("#btn-openGenerateKey").removeClass("btn-success").addClass("btn-outline-success")
    $("#btn-openGenerateExcel").removeClass("btn-warning").addClass("btn-outline-warning")
}

$("#btn-openGenerateKey").on('click', function() {
    var div = $("#generateKey");

    if (div.css('display') == "none") {
        resetAllButton();
        $("#btn-openGenerateKey").addClass("btn-success").removeClass("btn-outline-success")
        resetAllBox();
        div.css('display', 'block')
    } else {
        div.css('display', 'none')
        $("#btn-openGenerateKey").addClass("btn-outline-success").removeClass("btn-success")
    }
})
$("#btn-openGenerateExcel").on('click', function() {
    var div = $("#generateExcel");
    if (div.css('display') == "none") {
        resetAllButton();
        $("#btn-openGenerateExcel").addClass("btn-warning").removeClass("btn-outline-warning")
        resetAllBox();
        div.css('display', 'block')
    } else {
        $("#btn-openGenerateExcel").addClass("btn-outline-warning").removeClass("btn-warning")
        div.css('display', 'none')
    }
})

function renderOutput() {
    var input = $("#input").val();
    var input1 = input.toLowerCase();
    var key = input1.split(' ').join('_');
    console.log(key);
    var output = `'${key}' => '${input}',`;
    $("#output").val(output);
    console.log(output)

    var file = $("#input1").val();
    var output1 = `{{ __('${file}.${key}') }}`;
    $("#output1").val(output1);
}

function renderExcel() {
    var bladeInput = $("#bladeInput").val();
    var wordInput = $("#wordInput").val();

    bladeInput = bladeInput.split("'");
    bladeInput = bladeInput[1].split(".");
    var filePath = bladeInput[0];
    var key = bladeInput[1];

    var inn1 = wordInput.split("'");
    var keyInn = inn1[1];
    var Word = inn1[3];
    console.log(key)
    console.log(keyInn)
    var xxx = `${filePath}.php\t${key}\t${Word}`;

    if (keyInn == key) {
        $("#outputExcel").val(xxx);
        $("#outputExcel").addClass("is-valid").removeClass("is-invalid")
    } else {
        $("#outputExcel").addClass("is-invalid").removeClass("is-valid")
        console.log("Diff key ");
    }
}