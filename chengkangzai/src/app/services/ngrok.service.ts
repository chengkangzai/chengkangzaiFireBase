import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/dist/types/internal/BehaviorSubject';
import {map, switchMap, tap} from 'rxjs/operators';
import {Ngrok} from '../model/ngrok';
import {RoleService} from './role.service';
import {Timestamp} from '@firebase/firestore-types';
import {AngularFirestore} from "@angular/fire/compat/firestore";

export interface NgrokInterface {
  id: string;
  PCName: string;
  ngrok: string;
  protocol: string;
  timestamp: Timestamp;
  vpn: string;
}


@Injectable({
  providedIn: 'root'
})
export class NgrokService {

  constructor(
    private firestore: AngularFirestore,
    private roleService: RoleService,
  ) {

  }

  private _ngrok: BehaviorSubject<NgrokInterface[]> = new BehaviorSubject<NgrokInterface[]>([]);

  // @ts-ignore
  get ngrok() {
    return this._ngrok.asObservable();
  }

  fetch() {
    return this.roleService.getUser()
      .pipe(
        switchMap(user => {
            return this.firestore
              .collection('ngrok', ref => ref.where('email', '==', user?.providerData[0]?.email))
              .valueChanges({idField: 'id'}).pipe(
                map(resData => {
                  return (resData as NgrokInterface[])
                    .map(data => new Ngrok(
                      data.id,
                      data.PCName,
                      data.ngrok,
                      data.protocol,
                      data.timestamp,
                      data.vpn
                    ));

                }),
                tap(places => {
                  // @ts-ignore
                  return this._ngrok.next(places);
                })
              );
          }
        ))
      ;
  }

  calcMissingHour(time: Timestamp): number {
    return (new Date().getTime() - new Date(time.toDate()).getTime()) / (1000 * 3600);
  }

  async delete(ngrok: Ngrok) {
    await this.firestore.doc('ngrok/' + ngrok.id).delete();
  }
}
