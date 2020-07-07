var imageUrl = null;
$("#fileInput").change(function(e) {
    e.preventDefault();
    var fileBtn = $("#fileInput");

    var file = e.target.files[0];
    var storageRef = firebase.storage().ref(`moli/pic/${file.name}`);

    var task = storageRef.put(file);

    task.on('state_changed',
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload Progress is " + percentage);
        },
        function error(error) {
            console.log(error)
            fileBtn.removeClass("is-valid").addClass("is-invalid");
        },
        function complete() {
            fileBtn.removeClass("is-invalid").addClass("is-valid");
            task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                imageUrl = downloadURL;
                $("#fileInputLabel").text(file.name);
                $("#addRoleSaveBtn").removeAttr("disabled").removeClass("btn-secondary").addClass("btn-primary");
            });
        });
});

$("#addRoleSaveBtn").click((e) => {
    e.preventDefault();

    var name = $("#nameInput");
    var level = $("#levelInput");

    if (validation()) {
        console.log("validation pass")
        addToFirebase();
    }

    function validation() {
        (name.val()) ? name.removeClass("is-invalid").addClass("is-valid"):
            name.removeClass("is-valid").addClass("is-invalid");
        (level.val()) ? level.removeClass("is-invalid").addClass("is-valid"):
            level.removeClass("is-valid").addClass("is-invalid");
        (imageUrl) ? $("#fileInput").removeClass("is-invalid").addClass("is-valid"):
            $("#fileInput").removeClass("is-valid").addClass("is-invalid");

        if (name.val() && level.val() && imageUrl) {
            return true;
        } else {
            return false;
        }
    }

    function addToFirebase() {
        firebase.auth().onAuthStateChanged(function(user) {
            db
                .collection(`moli/${user.uid}/player`)
                .add({
                    name: name.val(),
                    picUrl: imageUrl,
                    level: level.val(),
                    material: []
                })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }
});

function objectLength(object) {
    var length = 0;
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            ++length;
        }
    }
    return length;
};

function renderPlayer(doc) {
    var id = doc.id;
    const data = doc.data();

    var materialListHead = `<thead class="thead-light"><tr><td>名字</td><td>已有材料</td><td>需求材料</td></tr></thead>`;

    var materialList = [];
    var progressBar = [];
    var tempest = [];
    if (objectLength(data.material) >= 1) {
        data.material.forEach(element => {
            function calcWhiteBase(num, color) {
                switch (color) {
                    case "white":
                        whiteBase = num;
                        break;
                    case "green":
                        whiteBase = num * 5;
                        break;
                    case "blue":
                        whiteBase = num * 5 * 5
                        break;
                    case "purple":
                        whiteBase = num * 5 * 5 * 5
                        break;
                    case "orange":
                        whiteBase = num * 5 * 5 * 5 * 5
                        break;
                }
                return whiteBase;
            }

            var name = element.name;
            var haveColor = element.have.color;
            var haveNumber = element.have.number;
            var wantedColor = element.wanted.color;
            var wantedNumber = element.wanted.number;

            var haveWhite = calcWhiteBase(haveNumber, haveColor);
            var wantedWhite = calcWhiteBase(wantedNumber, wantedColor);

            var percentage = (haveWhite / wantedWhite) * 100;
            if (percentage >= 100) {
                progressBar.push(`                    
                    <div class="progress m-2">
                        <div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="${percentage}" style="width: ${percentage}%">${name}</div>
                    </div>`);
            } else if (percentage <= 0) {
                progressBar.push(`                    
                    <div class="progress m-2">
                        <div class=" text-dark progress-bar progress-bar-striped bg-warning progress-bar-animated" role="progressbar" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100" style="width: ${percentage}%">${name}</div>
                    </div>`);
            } else {
                progressBar.push(`                    
                    <div class="progress m-2">
                        <div class="progress-bar progress-bar-striped bg-info progress-bar-animated" role="progressbar" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100" style="width: ${percentage}%">${name}</div>
                    </div>`);
            }

            materialList.push(`
                <tr>
                    <td>${name}</td>
                    <td>${haveColor}(${haveNumber})</td>
                    <td>${wantedColor}(${wantedNumber})</td>
                </tr>
                `)

            tempest.push(`<option value="${element.name}"> ${element.name}</option>`);
        });
    } else {
        materialListHead = "";
    }

    var modalForAdd = `
    <div class="modal fade" id="addMaterialForm${id}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add Material</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <select id="materialType${id}" class="custom-select mt-1">
                        <optgroup label="稀有材料">
                            <option disabled="disabled" aria-selected="true" selected hidden aria-hidden="true">选一个材料</option>
                            <option value="稀有金属">稀有金属</option>
                            <option value="优质木材">优质木材</option>
                            <option value="棉织">棉织</option>
                            <option value="水晶">水晶</option>
                            <option value="皮革">皮革</option>
                        </optgroup>
                        <optgroup label="普通材料">
                            <option value="毛皮">毛皮</option>
                            <option value="金属">金属</option>
                            <option value="木材">木材</option>
                            <option value="玉">玉</option>
                            <option value="布">布</option>
                        </optgroup>
                        </select>
                        <input type="number" class="form-control mt-2 " id="haveNumberInput${id}" placeholder="有的数量">
                        <select id="haveColorType${id}" class="form-control mt-1">
                            <option selected disabled hidden>有的颜色</option>
                            <option value="white" >白色</option>
                            <option value="green" class="text-white" style="background-color:lightgreen">绿色</option>
                            <option value="blue" class="text-white" style="background-color: blue">蓝色</option>
                            <option value="purple" class="text-white" style="background-color:blueviolet">紫色</option>
                            <option value="orange" class="text-white" style="background-color: orange">橙色</option>
                        </select>
                        <input type="number" class="form-control mt-2 " id="wantedNumberInput${id}" placeholder="要的数量">
                        <select id="wantedColorType${id}" class="form-control mt-1">
                            <option selected disabled hidden>要的颜色</option>
                            <option value="blue" class="text-white" style="background-color: blue">蓝色</option>
                            <option value="purple" class="text-white" style="background-color:blueviolet">紫色</option>
                            <option value="orange" class="text-white" style="background-color: orange">橙色</option>
                        </select>
                        <small class="form-text text-muted">you can only keep track of one colour for the moment</small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="updateMaterial('${id}')">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    `;

    var modalForDelete = `
    <div class="modal fade" id="deleteMaterialForm${id}" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Delete Material</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
                <select id="materialToDelete${id}" class="custom-select">
                <option selected hidden disabled>Choose one Material to delete</option>
                    ${tempest.sort().join("")}
                </select>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="deleteMaterial('${id}')">Save changes</button>
            </div>
        </div>
    </div>
</div>
    `;

    var dom = `
    <div class="card m-1 col-lg-3" style="height:100%">
        <img class="card-img-top" src="${data.picUrl}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">Level : ${data.level}</p>
            <table class="table table-borderless table-sm m-0 p-0" >
                ${materialListHead}
                <tbody>${materialList.sort().join("")}</tbody>
            </table>
            <div id="progressContainer">
            ${progressBar.sort().join("")}
            </div>
        </div>
        <div class="mx-auto" style="display:inline-box">
            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#addMaterialForm${id}">Add Material</button>
            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteMaterialForm${id}">Delete Material</button>
        </div>
    </div>
        ${modalForAdd}
        ${modalForDelete}
    `;
    $("#playerCardContainer").append(dom);

}

function updateMaterial(docID) {

    const name = $(`#materialType${docID} :selected`);
    const haveColor = $(`#haveColorType${docID} :selected`);
    const haveNumber = $(`#haveNumberInput${docID}`);
    const wantedColor = $(`#wantedColorType${docID} :selected`);
    const wantedNumber = $(`#wantedNumberInput${docID}`);
    var temp = [];


    if (validation()) {
        prepare()
    }

    function validation() {
        (haveNumber.val()) ?
        haveNumber.removeClass("is-invalid").addClass("is-valid"):
            haveNumber.removeClass("is-valid").addClass("is-invalid");
        (wantedNumber.val()) ?
        wantedNumber.removeClass("is-invalid").addClass("is-valid"):
            wantedNumber.removeClass("is-valid").addClass("is-invalid");

        (name.attr("hidden")) ?
        name.parent().parent().removeClass("is-valid").addClass("is-invalid"):
            name.parent().parent().removeClass("is-invalid").addClass("is-valid");

        (haveColor.attr("hidden")) ?
        haveColor.parent().removeClass("is-valid").addClass("is-invalid"):
            haveColor.parent().removeClass("is-invalid").addClass("is-valid");

        (wantedColor.attr("hidden")) ?
        wantedColor.parent().removeClass("is-valid").addClass("is-invalid"):
            wantedColor.parent().removeClass("is-invalid").addClass("is-valid");

        if (haveNumber.val() && wantedNumber.val()) {
            if (!(wantedColor.attr("hidden")) && !(haveColor.attr("hidden")) && !((name.attr("hidden")))) {
                return true;
            }
        }
        return false;
    }

    function prepare() {
        firebase.auth().onAuthStateChanged(function(user) {
            db
                .doc(`moli/${user.uid}/player/${docID}`)
                .get()
                .then(function(doc) {
                    temp = doc.data().material;
                    console.log(temp);
                    for (let i = 0; i < temp.length; i++) {
                        if (temp[i].name == name.val()) {
                            temp.splice(i, 1);
                            // console.log(temp[i]);
                        }
                    }
                    temp.push({
                        name: name.val(),
                        wanted: {
                            color: wantedColor.val(),
                            number: wantedNumber.val(),
                        },
                        have: {
                            color: haveColor.val(),
                            number: haveNumber.val(),
                        }
                    })
                    db
                        .doc(`moli/${user.uid}/player/${docID}`)
                        .update({
                            material: temp
                        })
                        .then(function(doc) {
                            $(`.modal-backdrop`).hide()
                        })
                        .catch(function(error) {
                            console.log(error)
                        })
                })
                .catch(function(error) {
                    console.log(error);
                })
        });
    }
}

function deleteMaterial(docID) {
    var name = $(`#materialToDelete${docID} :selected`);

    if (name.attr("hidden")) {
        name.parent().removeClass("is-valid").addClass("is-invalid");
    } else {
        var temp;
        firebase.auth().onAuthStateChanged(function(user) {
            db
                .doc(`moli/${user.uid}/player/${docID}`)
                .get()
                .then(function(doc) {
                    temp = doc.data().material;
                    for (let i = 0; i < temp.length; i++) {
                        if (temp[i].name == name.val()) {
                            temp.splice(i, 1);
                        }
                    }
                    db
                        .doc(`moli/${user.uid}/player/${docID}`)
                        .update({
                            material: temp
                        })
                        .then(function(doc) {
                            $(`.modal-backdrop`).hide()
                        })
                        .catch(function(error) {
                            console.log(error)
                        })
                })
                .catch(function(error) {
                    console.log(error);
                })
        });
    }
}

firebase.auth().onAuthStateChanged(user => {
    (user) ? $("#welcomerText").text(`Hello ! ${user.displayName}`): window.location.href = "../index.html"
    db
        .collection(`moli/${user.uid}/player`)
        .onSnapshot(snap => {
            $("#playerCardContainer").replaceWith(`<div id="playerCardContainer" class="card-group"></div>`);
            snap.forEach(doc => {
                renderPlayer(doc);
            });
        })
});

$(document).on('load', function() {

    $("#navBar").load("nav.html");
});