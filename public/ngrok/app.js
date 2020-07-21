function resetCopyBtn(id) {
    var vpnBtn = $(`#copyVPN_${id}`);
    var mstscBtn = $(`#copymstsc_${id}`);
    var tunnelBtn = $(`#copyNgrok_${id}`);

    if (vpnBtn.hasClass("btn-info")) {
        vpnBtn.removeClass("btn-info").addClass("btn-primary");
    }
    if (mstscBtn.hasClass("btn-info")) {
        mstscBtn.removeClass("btn-info").addClass("btn-primary");
    }
    if (tunnelBtn.hasClass("btn-info")) {
        tunnelBtn.removeClass("btn-info").addClass("btn-primary");
    }
}

function copyTunnelAddress(id) {
    var ngrok = $(`#ngrokID_${id}`).text();
    ngrok = ngrok.split('://');
    document.getElementById(`ngrokInput_${id}`).value = ngrok[1];
    $(`#ngrokInput_${id}`).show();
    var copyText = document.getElementById(`ngrokInput_${id}`);

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    document.execCommand("copy");

    $(`#ngrokInput_${id}`).hide();
    resetCopyBtn(id)
    $(`#copyNgrok_${id}`).removeClass("btn-primary").addClass("btn-info");

}


function copymstsc(id) {
    var ngrok = $(`#ngrokID_${id}`).text();
    ngrok = ngrok.split('://');
    document.getElementById(`ngrokInput_${id}`).value = "mstsc -v " + ngrok[1];
    $(`#ngrokInput_${id}`).show();
    var copyText = document.getElementById(`ngrokInput_${id}`);

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    document.execCommand("copy");

    $(`#ngrokInput_${id}`).hide();
    resetCopyBtn(id)
    $(`#copymstsc_${id}`).removeClass("btn-primary").addClass("btn-info");

}

function copyVPNAddress(id) {
    $(`#VPNInput_${id}`).show();

    var copyText = document.getElementById(`VPNInput_${id}`);

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    document.execCommand("copy");

    $(`#VPNInput_${id}`).hide();
    resetCopyBtn(id)
    $(`#copyVPN_${id}`).removeClass("btn-primary").addClass("btn-info");

}

function deletePC(pcName, id) {
    var res = confirm(`Are you sure you want to delete ${pcName}?`);
    if (res == true) {
        db
            .doc(`ngrok/${id}`)
            .delete()
            .then((doc) => {
                $(`#div_${id}`).hide();
            })
            .catch((error) => {
                $(`#div_${id}`).hide();
                console.log(error)
            })
    }
}

function renderPC(data) {
    var info = data.data();
    var vpnDom = "<div></div>",
        vpnBtn = "<div></div>",
        inactiveDom = "";

    var lastSeen = new Date(info.timestamp.toDate()).toLocaleString();
    var ran = Math.round(Math.random() * 100132400);
    if (!(info.vpn === "N/A")) {
        vpnDom = `<p class='card-text' id='VPN_${ran}'>The vpn is :${info.vpn} </p><input value='${info.vpn}' id='VPNInput_${ran}' style='display:none'>`;
        vpnBtn = `<a id='copyVPN_${ran}' class='mt-1 btn btn-primary text-white' onclick='copyVPNAddress(${ran})' role='button' href='#'>Copy VPN </a>`;
    }
    var copyBtn = `
    <a id='copyNgrok_${ran}' class='mt-1 btn btn-primary text-white' onclick='copyTunnelAddress(${ran})' role='button' href='#'>Copy ngrok tunnel</a> </br>
    <a id='copymstsc_${ran}' class='mt-1 btn btn-primary text-white' onclick='copymstsc(${ran})' role='button' href='#'>MSTSC</a>
    `;
    if (info.protocol == "https" || info.protocol == "http") {
        copyBtn = `<a id='copyNgrok_${ran}' class='mt-1 btn btn-primary text-white' onclick='copyTunnelAddress(${ran})' role='button' href='${info.ngrok}'>
        Go to ${info.PCName}</a>`;
    };

    var lastReport = calcMissingHour(info.timestamp);
    if (lastReport > 12) {
        inactiveDom = `
        <div class="alert alert-danger fade show" role="alert" +>
            Haven't see this PC in ${Math.round(lastReport)} hour
        </div>
        `;
    } else if (lastReport > 2) {
        inactiveDom = `
        <div class="alert alert-success fade show" role="alert" +>
            This PC is seen in ${Math.round(lastReport)} hour
        </div>
        `;
    }

    var mainDom = `
    <div class='p-2 col-lg-3'>
        <div class='card ' id='div_${ran}'>
            <div class='card-body'>
                <h5 class='card-title' ">${info.PCName}<h5>
                ${inactiveDom}
                <p class='card-text' id='ngrokID_${ran}'>${info.ngrok}</p>
                <input value='${info.ngrok}' id='ngrokInput_${ran}' style='display:none'>
                ${vpnDom}
                <p class='card-text' >The protocol is: <span id='protocol_${ran}'>${info.protocol}<span> </p>
                <p class='card-text'>Last seen: ${lastSeen} </p>
                <div>${copyBtn}</div>
                <div>${vpnBtn}</div>
                <div><a class='btn btn-danger mt-1 text-white' href='#' role='button' onclick='deletePC("${info.PCName}","${data.id}")'>Delete </a></div>
            </div>
        </div>
    </div>
    `;

    // console.log(mainDom);
    $("#ngrokContainer").append(mainDom);
}

function renderNoRight() {
    var dom = `<div class='p-2 col-lg-6 mx-auto'>
        <div class='card text-center py-5'>
            <div class='card-body'>
                <h5 class='card-title text-danger'> You have no right to view this page <h5>
                <p class='card-text'> 403 </p>
            </div>
        </div>
    </div>`;
    $("#ngrokContainer").append(dom);
}

function calcMissingHour(time) {
    const date1 = new Date(time.toDate())
    const date2 = new Date()
    var DIffInTime = date2.getTime() - date1.getTime();
    var DiffInHour = DIffInTime / (1000 * 3600);
    return DiffInHour;
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user.email == "pycck@hotmail.com" || user.email == "kangkangge.ge@gmail.com") {
        db
            .collection("ngrok")
            .onSnapshot(function(snap) {
                $("#ngrokContainer").replaceWith("<div class='row m-0' id='ngrokContainer'></div>");
                snap.forEach(function(doc) {
                    renderPC(doc);
                });
            });
    } else {
        renderNoRight();
    }
});