$("#input").on('keyup', function () {
    renderOutput()
});
$("#input1").on('keyup', function () {
    renderOutput()
});
$("#bladeInput").on('keyup', function () {
    renderExcel();
});
$("#wordInput").on('keyup', function () {
    renderExcel();
});
$("#submitExcelInput").on('click', function () {
    submitToFB();
});

$("#selectButton").on('click', function () {
    renderSelection();
});

let uid;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        uid = user.uid;
    } else {
        // User is signed out.
    }
});

function resetAllBox() {
    $("#generateKey").hide();
    $("#generateExcel").hide();
    $("#generateExcelToKey").hide();
}

function resetAllButton() {
    $("#btn-openGenerateKey").removeClass("btn-success").addClass("btn-outline-success")
    $("#btn-openGenerateExcel").removeClass("btn-warning").addClass("btn-outline-warning")
    $("#btn-openGenerateExcelToKey").removeClass("btn-info").addClass("btn-outline-info")
}

$("#btn-openGenerateKey").on('click', function () {
    var div = $("#generateKey");

    if (div.css('display') === "none") {
        resetAllButton();
        $("#btn-openGenerateKey").addClass("btn-success").removeClass("btn-outline-success")
        resetAllBox();
        div.css('display', 'block')
    } else {
        div.css('display', 'none')
        $("#btn-openGenerateKey").addClass("btn-outline-success").removeClass("btn-success")
    }
})
$("#btn-openGenerateExcel").on('click', function () {
    var div = $("#generateExcel");
    if (div.css('display') === "none") {
        resetAllButton();
        $("#btn-openGenerateExcel").addClass("btn-warning").removeClass("btn-outline-warning")
        resetAllBox();
        div.css('display', 'block')
    } else {
        $("#btn-openGenerateExcel").addClass("btn-outline-warning").removeClass("btn-warning")
        div.css('display', 'none')
    }
});
let file = [];
let dataFromDB = [];
$("#btn-openGenerateExcelToKey").on('click', function () {
    const div = $("#generateExcelToKey");
    if (div.css('display') == "none") {
        resetAllButton();
        $("#btn-openGenerateExcelToKey").addClass("btn-info").removeClass("btn-outline-info")
        resetAllBox();
        div.css('display', 'block')
        db
            .collection(`misc/${uid}/laravelKey`)
            .get()
            .then((snap) => {
                snap.forEach(function (doc) {
                    file.push(doc.data().filename)
                    dataFromDB.push(doc.data());
                });
            })
    } else {
        $("#btn-openGenerateExcelToKey").addClass("btn-outline-info").removeClass("btn-info")
        div.css('display', 'none')
    }
})

function renderOutput() {
    const input = $("#input").val();
    const key = input.toLowerCase().split(' ').join('_');
    console.log(key);
    const output = `'${key}' => '${input}',`;
    $("#output").val(output);
    console.log(output)

    const file = $("#input1").val();
    const output1 = `{{ __('${file}.${key}') }}`;
    $("#output1").val(output1);
}

function renderExcel() {
    let bladeInput = $("#bladeInput").val();
    const wordInput = $("#wordInput").val();

    bladeInput = bladeInput.split("'");
    bladeInput = bladeInput[1].split(".");
    const filePath = bladeInput[0];
    const key = bladeInput[1];

    const inn1 = wordInput.split("'");
    const keyInn = inn1[1];
    const Word = inn1[3];
    console.log(key)
    console.log(keyInn)
    const xxx = `${filePath}.php\t${key}\t${Word}`;

    if (keyInn === key) {
        const outputExcel = $("#outputExcel")
        outputExcel.val(xxx);
        outputExcel.addClass("is-valid").removeClass("is-invalid")
    } else {
        $("#outputExcel").addClass("is-invalid").removeClass("is-valid")
        console.log("Diff key ");
    }
}

function submitToFB() {
    const inputExcel = $("#inputExcel");
    const input = inputExcel.val();
    const input2 = input.split("\n");
    console.log(input2.length);
    for (let i = 0; i < input2.length; i++) {
        const split = input2[i].split("\t")
        if (split.length === 6) {
            const object = {
                filename: split[0],
                key: split[1],
                en: split[2],
                zh: split[3],
                th: split[4],
                my: split[5]
            }
            console.log(object);
            db
                .collection(`misc/${uid}/laravelKey`)
                .add(Object.assign({}, object))
                .then((response) => {
                    inputExcel.addClass("is-valid").removeClass("is-invalid")
                    inputExcel.val("");
                })
                .catch((error) => {
                    console.log(error)
                });

        } else {
            $("#inputExcel").addClass("is-invalid").removeClass("is-valid")
        }
    }
}

function renderSelection() {
    const uniqueItems = Array.from(new Set(file));
    console.log(uniqueItems);
    $("#fileSelection").replaceWith(`<select class="form-control mb-1" id="fileSelection" onchange='exportKey()'></select>`);
    uniqueItems.forEach((value, index) => {
        $("#fileSelection").append(`<option>${uniqueItems[index]}</option>`);
    })
}

function exportKey() {

    $("#excelZH").val("");
    $("#excelTH").val("");
    $("#excelMY").val("");
    const keys = Array.from(new Set(dataFromDB));
    const uniqueKey = [...new Set(dataFromDB.map(item => item.key))]; // [ 'A', 'B']

    let zhDom = [],
        thDom = [],
        myDom = [];
    for (const key in keys) {
        if (keys.hasOwnProperty(key)) {
            const element = keys[key];
            if (element.filename === $("#fileSelection :selected").text()) {
                const index = uniqueKey.indexOf(element.key);
                if (index > -1) {
                    zhDom.push(`\t'${element.key}' => '${element.zh}'`)
                    thDom.push(`\t'${element.key}' => '${element.th}'`)
                    myDom.push(`\t'${element.key}' => '${element.my}'`)
                }
                // Delete 
                const index1 = uniqueKey.indexOf(element.key);
                if (index1 > -1) {
                    uniqueKey.splice(index1, 1);
                }

            }
        }
    }

    $("#excelZH").val(zhDom.sort().join(", \n"));
    $("#excelTH").val(thDom.sort().join(", \n"));
    $("#excelMY").val(myDom.sort().join(", \n"));
    if (zhDom.length !== 0 || thDom.length !== 0 || myDom.length !== 0) {
        $("#excelZH").addClass("is-valid").removeClass("is-invalid");
        $("#excelTH").addClass("is-valid").removeClass("is-invalid");
        $("#excelMY").addClass("is-valid").removeClass("is-invalid");
    } else {
        $("#excelZH").removeClass("is-valid").addClass("is-invalid");
        $("#excelTH").removeClass("is-valid").addClass("is-invalid");
        $("#excelMY").removeClass("is-valid").addClass("is-invalid");
    }
}
