import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import firebase from "firebase";
import {BehaviorSubject} from "rxjs";
import {map, tap} from "rxjs/operators";
import {Ngrok} from "../model/ngrok";
import Timestamp = firebase.firestore.Timestamp;

export interface NgrokInterface {
    id: string,
    PCName: string,
    ngrok: string,
    protocol: string,
    timestamp: Timestamp,
    vpn: string
}


@Injectable({
    providedIn: 'root'
})
export class NgrokService {

    private _ngrok = new BehaviorSubject<NgrokInterface[]>([]);

    constructor
    (
        private firestore: AngularFirestore
    ) {

    }

    fetch() {
        return this.firestore.collectionGroup('ngrok').valueChanges({idField: 'id'}).pipe(
            map(resData => {
                console.log(resData)
                let temp = [];
                (<NgrokInterface[]>resData).forEach(data => {
                    temp.push(new Ngrok(
                        data.id,
                        data.PCName,
                        data.ngrok,
                        data.protocol,
                        data.timestamp,
                        data.vpn
                    ));
                })
                return temp;
            }),
            tap(places => {
                return this._ngrok.next(places);
            })
        )
    }

    get ngrok() {
        return this._ngrok.asObservable();
    }

    calcMissingHour(time: Timestamp): number {
        return (new Date().getTime() - new Date(time.toDate()).getTime()) / (1000 * 3600);
    }

    async delete(ngrok: Ngrok) {
        await this.firestore.doc('ngrok/' + ngrok.id).delete();
    }


}
