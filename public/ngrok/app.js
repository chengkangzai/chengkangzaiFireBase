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

    copyText.select();
    copyText.setSelectionRange(0, 99999);

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

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    document.execCommand("copy");

    $(`#ngrokInput_${id}`).hide();
    resetCopyBtn(id)
    $(`#copymstsc_${id}`).removeClass("btn-primary").addClass("btn-info");

}

function copyVPNAddress(id) {
    $(`#VPNInput_${id}`).show();
    var copyText = document.getElementById(`VPNInput_${id}`);

    copyText.select();
    copyText.setSelectionRange(0, 99999);

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
    const info = data.data();

    const lastSeen = new Date(info.timestamp.toDate()).toLocaleString();
    const ran = Math.round(Math.random() * 100132400);

    const vpnDom = (() => {
        if (!(info.vpn === "N/A")) {
            return `<p class='card-text' id='VPN_${ran}'>The vpn is :${info.vpn} </p><input value='${info.vpn}' id='VPNInput_${ran}' style='display:none'>`;
        }
        return "<div></div>"
    })();

    const vpnBtn = (() => {
        if (!(info.vpn === "N/A")) {
            return `<a id='copyVPN_${ran}' class='mt-1 btn py-2 btn-primary' onclick='copyVPNAddress(${ran})' role='button' href='#'>Copy VPN </a>`;
        }
        return "<div></div>";
    })();

    const copyBtn = (() => {
        if (info.protocol == "https" || info.protocol == "http") {
            return `<button id='copyNgrok_${ran}' class='mt-1 btn py-2 btn-primary' role='button' href='${info.ngrok}'>Go to ${info.PCName}</button>`;
        }
        return `
        <a id='copyNgrok_${ran}' class='mt-1 btn py-2 btn-outline-primary' onclick='copyTunnelAddress(${ran})' role='button' href='#'>Copy ngrok tunnel</a> </br>
        <a id='copymstsc_${ran}' class='mt-1 btn py-2 btn-outline-primary' onclick='copymstsc(${ran})' role='button' href='#'>MSTSC</a>
        `;
    })();

    const inactiveDom = (() => {
        var lastReport = calcMissingHour(info.timestamp);
        var cssClass = (lastReport > 12) ? "alert-danger" : (lastReport > 2) ? "alert-info" : "";
        return (lastReport > 1) ?
            `<div class="alert ${cssClass} fade show" role="alert" >
            This PC last seen in ${Math.round(lastReport)} hour</div>` : ""
    })();

    const mainDom = (() => {
        return `
<div class='p-2 col-lg-3'>
    <div class='card ' id='div_${ran}'>
        <div class='card-body'>
            <h5 class='card-title' ">${info.PCName}<h5>
            ${inactiveDom}
            <p class='card-text' id='ngrokID_${ran}'>${info.ngrok}</p>
            <input value='${info.ngrok}' id='ngrokInput_${ran}' style='display:none'>
            ${vpnDom}
            <p class='card-text'> The protocol is: <span id='protocol_${ran}'>${info.protocol}<span> </p>
            <p class='card-text'>Last seen: ${lastSeen} </p>
            ${copyBtn}${vpnBtn}
            <a class='btn btn-outline-danger py-2 mt-1' href='#' role='button' onclick='deletePC("${info.PCName}","${data.id}")'>Delete </a>
        </div>
    </div>
</div>`;
    })();

    $("#ngrokContainer").append(mainDom);
}

function renderDevelopment() {
    var dom = `
<div class='p-2 col-lg-6 mx-auto'>
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
    const DIffInTime = date2.getTime() - date1.getTime();
    const DiffInHour = DIffInTime / (1000 * 3600);
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
        renderDevelopment();
    }
});