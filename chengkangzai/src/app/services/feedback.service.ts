import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import firebase from "firebase";
import {AngularFirestore} from "@angular/fire/firestore";
import {map, tap} from "rxjs/operators";
import {Feedback} from "../model/feedback";
import {AuthService} from "./auth.service";
import Timestamp = firebase.firestore.Timestamp;

interface FeedbackInterface {
    id: string,
    feedback: string,
    timestamp: Timestamp,
    user: string
}

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {

    private _feedback = new BehaviorSubject<Feedback[]>([]);

    constructor(
        private firestore: AngularFirestore,
        private authService: AuthService
    ) {
    }

    fetch() {
        return this.firestore.collectionGroup('feedback').valueChanges({idField: 'id'}).pipe(
            map(resData => {
                let temp = [];
                (<FeedbackInterface[]>resData).forEach(data => {
                    temp.push(new Feedback(data.id, data.feedback, data.timestamp, data.user))
                })
                return temp;
            })
            , tap(feedback => {
                return this._feedback.next(feedback);
            })
        )
    }

    get feedback() {
        return this._feedback.asObservable()
    }

    async update(oriFeedback: Feedback, feedback: string) {
        return await this.firestore.doc(`feedback/${oriFeedback.id}`).set({
            feedback: feedback
        });
    }

    async delete(feedback: Feedback) {
        return await this.firestore.doc(`feedback/${feedback.id}`).delete();
    }

    async add(feedback: string) {
        const id = this.firestore.createId()
        const email = this.authService.userData.email;
        return await this.firestore.collection('feedback').doc(id).set({
            id: id,
            feedback: feedback,
            timestamp: Timestamp.fromDate(new Date()),
            user: email
        })
    }
}
