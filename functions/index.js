const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.randomNumber = functions.https.onRequest((req, res) => {
        const number = Math.round(Math.random() * 100);
        res.send(number.toString());
    })
    // https: us-central1-chengkangzai.cloudfunctions.net/updateNgrok
exports.updateUnit = functions.https.onRequest((req, res) => {
    var unitInfo = {
        unitNumber: req.body.unitNumber || "N/A",
        ssid: req.body.ssid || "N/A",
        wifiPass: req.body.wifiPass || "N/A",
        PPPoeUserName: req.body.PPPoeUserName || "N/A",
        PPPoePassword: req.body.PPPoePassword || "N/A",
        routerModel: req.body.routerModel || "N/A",
        routerSN: req.body.routerSN || "N/A",
        routerMac: req.body.routerMac || "N/A",
        routerPass: req.body.routerPass || "N/A",
    };
    if (req.method === "GET") {
        res.send({
            status: 400,
            message: "Please do not use GET method to open this API 😡😡😡😡"
        })
        process.exit()
    }

    if (unitInfo.unitNumber === "N/A" || unitInfo.ssid === "N/A" || unitInfo.wifiPass === "N/A" || unitInfo.PPPoeUserName === "N/A" || unitInfo.PPPoePassword === "N/A" || unitInfo.routerModel === "N/A" || unitInfo.routerSN === "N/A" || unitInfo.routerMac === "N/A" || unitInfo.routerPass === "N/A") {
        var exampleParam = {
            unitNumber: "VS-A1-10-06",
            ssid: "VS-A1-10-06",
            wifiPass: "PASSWORD(might hashed, let's discuss)",
            PPPoeUserName: "apu@timebb",
            PPPoePassword: "123456",
            routerModel: "TP-LINK AC1200",
            routerSN: "ASDSADSADSAD",
            routerMac: "ADSDSADASD",
            routerPass: "ASDASDSA",
        }
        res.send({
            status: 400,
            message: "You missed some of the arg to passed in this are the example of it ",
            exampleParam: exampleParam
        })
        process.exit()
    }
    res.status(200).send(unitInfo);
})

exports.ngrokUpdate = functions.https.onRequest((req, res) => {
    var ngrokStatus = {
        PCName: req.body.pcName || "N/A",
        vpn: req.body.vpnIP || "N/A",
        ngrok: req.body.ngrok || "N/A",
        protocol: req.body.protocol || "N/A",
        timestamp: admin.firestore.Timestamp.fromDate(new Date())
    }

    function validation() {
        var message = [];
        if (ngrokStatus.PCName === "N/A") message.push("PCName should not be empty!")
        if (ngrokStatus.ngrok === "N/A") message.push("ngrok should not be empty!")
        if (ngrokStatus.protocol === "N/A") message.push("protocol should not be empty!")

        if (!(message.length === 0)) {
            res.send({ message });
            process.exit();
        }
        return true;
    }

    function addPC() {
        validation();
        db
            .collection("ngrok")
            .add(ngrokStatus)
            .then(response => {
                res.send(response);
                return true;
            })
            .catch(error => {
                res.send(error);
                return true;
            });
        res.send({
            message: `This seem like you are first time register to the system! Welcome,${ngrokStatus.PCName} !`
        });
    }

    function updatePC(id) {
        validation();
        db
            .doc(`ngrok/${id}`)
            .update(ngrokStatus)
            .then((doc) => {
                res.send(doc);
                return true;
            })
            .catch((error) => {
                res.send(error);
                return true;
            })
        res.send({
            message: `Welcome back, ${ngrokStatus.PCName}! `
        });
    }


    var pcname = req.body.pcName;
    db
        .collection(`ngrok`)
        .where('PCName', "==", pcname)
        .get()
        .then(snap => {
            var docId;
            snap.forEach((data) => {
                docId = data.id;
            });
            (snap.empty) ? addPC(): updatePC(docId);
            return true;
        })
        .catch(error => {
            res.send(error)
            return true;
        });
})