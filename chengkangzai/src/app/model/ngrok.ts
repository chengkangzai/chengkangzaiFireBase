import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

export class Ngrok {
    constructor(
        public id: string,
        public PCName: string,
        public ngrok: string,
        public protocol: string,
        public timestamp: Timestamp,
        public vpn: string
    ) {
    }

}
