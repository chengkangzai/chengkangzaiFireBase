import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export class Ngrok {
    constructor(
        public PCName: string,
        public ngrok: string,
        public protocol: string,
        public timestamp: Timestamp,
        public vpn: string
    ) {
    }

}
