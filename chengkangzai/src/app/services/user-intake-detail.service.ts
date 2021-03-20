import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {RoleService} from './role.service';
import {UserIntakeGroup} from '../model/user-intake-group';


export interface UserIntakeDetail {
    id: string;
    intake: string;
    group: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserIntakeDetailService {

    constructor(
        private firestore: AngularFirestore,
        private roleService: RoleService
    ) {
    }

    // tslint:disable-next-line:variable-name
    private _userIntakeGroup;

    get userIntakeGroup() {
        return this._userIntakeGroup;
    }

    fetch() {
        return this.roleService.getUser().pipe(
            switchMap(user => {
                return this.firestore.collection(`user/${user.uid}/intakeDetail`).valueChanges({idField: 'id'}).pipe(
                    map((resData) => {
                        const res = (resData as UserIntakeDetail[])[0];
                        return new UserIntakeGroup(res.id, res.intake, res.group);
                    }),
                    tap(userIntakeGroup => {
                        return this._userIntakeGroup = userIntakeGroup;
                    })
                );
            }));
    }

    set(userIntakeGroup: UserIntakeGroup) {
        const id = this.firestore.createId();
        return this.roleService.getUser().pipe(
            switchMap(user => {
                return this.firestore.doc(`user/${user.uid}/intakeDetail/${id}`).set(
                    JSON.parse(JSON.stringify(userIntakeGroup))
                );
            }));
    }

}
