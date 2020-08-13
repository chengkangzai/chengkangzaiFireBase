const functions = require('firebase-functions');
const admin = require('firebase-admin');
const crypto = require('crypto');
admin.initializeApp();
const db = admin.firestore();

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
        timestamp: admin.firestore.Timestamp.fromDate(new Date()),
    };

    if (req.method === "GET") {
        res.send({
            status: 400,
            message: "Please do not use GET method to open this API 😡😡😡😡"
        })
        process.exit()
    }

    function validate() {
        verifyToken()
        var error = [];
        if (unitInfo.unitNumber === "N/A") { error.push("unitNumber cannot be empty") }
        if (unitInfo.ssid === "N/A") { error.push("ssid cannot be empty") }
        if (unitInfo.wifiPass === "N/A") { error.push("wifiPass cannot be empty") }
        if (unitInfo.PPPoeUserName === "N/A") { error.push("PPPoeUserName cannot be empty") }
        if (unitInfo.PPPoePassword === "N/A") { error.push("PPPoePassword cannot be empty") }
        if (unitInfo.routerModel === "N/A") { error.push("routerModel cannot be empty") }
        if (unitInfo.routerSN === "N/A") { error.push("routerSN cannot be empty") }
        if (unitInfo.routerMac === "N/A") { error.push("routerMac cannot be empty") }
        if (unitInfo.routerPass === "N/A") { error.push("routerPass cannot be empty") }
        if (error.length >= 1) {
            res.send({
                status: 400,
                message: error.join(",")
            })
        }
        return true;
    }

    function addUnit() {
        console.log("Adding");
        db
            .collection("AccomUnit")
            .add(unitInfo)
            .then(response => {
                res.send({
                    status: 200,
                    message: `Unit : ${unitInfo.unitNumber} is saved in database !`
                });
                return true;
            })
            .catch(error => {
                console.log("Error occur during Adding new unit", error);
                res.send({
                    status: 500,
                    message: "Unit Saving error ! please contact backend developer",
                    error: error
                });
                return true;
            });
    }

    function updateUnit(id) {
        db
            .doc(`AccomUnit/${id}`)
            .update(unitInfo)
            .then((doc) => {
                res.send({
                    status: 200,
                    message: `Unit : ${unitInfo.unitNumber} is updated in database !`
                });
                return true;
            })
            .catch((error) => {
                console.log("Error occur during Update exiting unit", error);
                res.send({
                    status: 500,
                    message: "Unit Update error ! please contact backend developer",
                    error: error
                });
                return true;
            })
    }

    function verifyToken() {
        token = req.body.token || "N/A"
        if (token === "N/A") {
            res.send({
                status: 403,
                message: "Who are you !?"
            });
        }
        db
            .collection(`authToken`)
            .where('token', "==", token)
            .get()
            .then(snap => {
                if (snap.empty) {
                    return false;
                } else {
                    snap.forEach(doc => {
                        unitInfo.updatedBy = doc.data().email;
                        console.log(doc.data().email);
                    });
                    return true;
                }
            })
            .catch(error => {
                res.status(500).send(error)
                return false;
            });

    }

    if (validate()) {
        db
            .collection("AccomUnit")
            .where('unitNumber', '==', unitInfo.unitNumber)
            .get()
            .then(snap => {
                if (snap.empty) {
                    addUnit()
                } else {
                    snap.forEach((data) => {
                        docId = data.id;
                    });
                    updateUnit(docId)
                }
                return true;
            })
            .catch(error => {
                console.log("Error occur during finding exiting unit", error);
                res.send({
                    status: 500,
                    message: "Unit Saving error ! please contact backend developer",
                    error: error
                });
                return true;
            });
    }
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
            if (snap.empty) {
                addPC();
            } else {
                snap.forEach((data) => {
                    docId = data.id;
                });
                updatePC(docId)
            }
            return true;
        })
        .catch(error => {
            res.send(error)
            return true;
        });
})

exports.login = functions.https.onRequest((req, res) => {

    if (req.method !== "POST") {
        res.send({
            status: 405,
            message: "Method not Allow"
        });
    }
    var data = {
        email: req.body.email || "N/A",
        password: req.body.password || "N/A",
        unit: req.body.unit || "N/A",
    }

    function validation() {
        var message = [];
        if (data.email === "N/A") message.push("Email Cannot be empty");
        if (data.password === "N/A") message.push("Password Cannot be empty");
        if (data.unit === "N/A") message.push("Unit Cannot be empty");
        if (message.length >= 1) {
            res.send({
                status: 400,
                message: message.join(",")
            });
        }
        return true;
    }

    function registerToken(token) {
        db
            .collection(`authToken`)
            .add({
                email: data.email,
                unit: data.unit,
                token: token
            })
            .then(response => {
                res.send({
                    status: 200,
                    message: "You have Successfully Sign in!",
                    token: token
                })
                return true;
            })
            .catch(error => {
                res.send({
                    status: 500,
                    message: "Whoops ! There is some error!",
                    error: error
                })
                return true;
            });
    }

    function hashIt(secret, unit) {
        const hash = crypto.createHmac('sha256', secret)
            .update(unit)
            .digest('hex');
        return hash
    }

    function resToken(id) {
        db
            .doc(`authToken/${id}`)
            .get()
            .then(doc => {
                res.send({
                    status: 400,
                    message: "You alr have token la ",
                    token: doc.data().token
                });
                return true;
            })
            .catch(error => {
                console.log(error);
                return true;
            })
    }

    if (validation()) {
        db
            .collection(`authToken`)
            .where('email', "==", data.email)
            .where('unit', "==", data.unit)
            .get()
            .then(snap => {
                if (snap.empty) {
                    registerToken(hashIt(data.email, data.unit));
                } else {
                    snap.docs.forEach((data) => {
                        resToken(data.id);
                    });
                }
                return true;
            })
            .catch(error => {
                res.status(500).send(error)
                return true;
            });
    }
});