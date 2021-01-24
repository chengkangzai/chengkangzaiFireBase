import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import firebase from 'firebase';
import {BehaviorSubject} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {Ngrok} from '../model/ngrok';
import {RoleService} from './role.service';
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

    constructor
    (
        private firestore: AngularFirestore,
        private roleService: RoleService,
    ) {

    }

    private _ngrok = new BehaviorSubject<NgrokInterface[]>([]);

    get ngrok() {
        return this._ngrok.asObservable();
    }

    fetch() {
        return this.roleService.getUser().pipe(
            switchMap(user => {
                return this.firestore.collection('ngrok', ref => ref.where('email', '==', user.email)
                ).valueChanges({idField: 'id'}).pipe(
                    map(resData => {
                        let temp = [];
                        (<NgrokInterface[]> resData).forEach(data => {
                            temp.push(new Ngrok(
                                data.id,
                                data.PCName,
                                data.ngrok,
                                data.protocol,
                                data.timestamp,
                                data.vpn
                            ));
                        });
                        return temp;
                    }),
                    tap(places => {
                        return this._ngrok.next(places);
                    })
                );
            }));
    }

    calcMissingHour(time: Timestamp): number {
        return (new Date().getTime() - new Date(time.toDate()).getTime()) / (1000 * 3600);
    }

    async delete(ngrok: Ngrok) {
        await this.firestore.doc('ngrok/' + ngrok.id).delete();
    }


}
