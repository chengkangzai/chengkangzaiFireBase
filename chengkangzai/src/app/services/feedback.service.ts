import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {Feedback} from '../model/feedback';
import {AuthService} from './auth.service';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Timestamp} from '@firebase/firestore-types';
import {BehaviorSubject} from "rxjs/dist/types/internal/BehaviorSubject";

interface FeedbackInterface {
  id: string;
  feedback: string;
  timestamp: Timestamp;
  user: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {
  }

  // tslint:disable-next-line:variable-name
  private _feedback = new BehaviorSubject<Feedback[]>([]);

  // @ts-ignore
  get feedback() {
    return this._feedback.asObservable();
  }

  fetch() {
    return this.firestore.collectionGroup('feedback').valueChanges({idField: 'id'}).pipe(
      map(resData => {
        return (resData as FeedbackInterface[])
          .map(data => new Feedback(data.id, data.feedback, data.timestamp, data.user));
      })
      , tap(feedback => {
        // @ts-ignore
        return this._feedback.next(feedback);
      })
    );
  }

  async update(oriFeedback: Feedback, feedback: string) {
    return await this.firestore.doc(`feedback/${oriFeedback.id}`).set({
      feedback
    });
  }

  async delete(feedback: Feedback) {
    return await this.firestore.doc(`feedback/${feedback.id}`).delete();
  }

  async add(feedback: string) {
    const id = this.firestore.createId();
    const email = this.authService.userData.email;
    return await this.firestore
      .collection('feedback')
      .doc(id)
      .set({
        id,
        feedback,
        timestamp: Timestamp.fromDate(new Date()),
        user: email
      });
  }
}
