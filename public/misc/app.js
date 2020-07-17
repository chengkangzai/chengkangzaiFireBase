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

$("#btn-openGenerateKey").on('click', function() {
    var div = $("#generateKey");
    if (div.css('display') == "none") {
        div.css('display', 'flex')
    } else {
        div.css('display', 'none')
    }
})
$("#btn-openGenerateExcel").on('click', function() {
    var div = $("#generateExcel");
    if (div.css('display') == "none") {
        div.css('display', 'flex')
    } else {
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
    } else {
        console.log("Diff key ");
    }
}