import {Feedback} from './feedback';
import firebase from "firebase/app";

describe('Feedback', () => {
    it('should create an instance', () => {
        expect(new Feedback('', new
            firebase.firestore.Timestamp(20000, 2000000), ''
        )).toBeTruthy();
    });
});
