import {Ngrok} from './ngrok';
import firebase from "firebase";

describe('Ngrok', () => {
    it('should create an instance', () => {
        expect(new Ngrok('hi', '0.tcp.ap.ngrok.io:11111', 'tcp',
            new firebase.firestore.Timestamp(20000, 2000000), 'vpn')).toBeTruthy();
    });
});
