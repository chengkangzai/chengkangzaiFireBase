import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {switchMap} from "rxjs/operators";
import firebase from "firebase";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    constructor(
        private auth: AngularFireAuth
    ) {
    }

    getUser(): Observable<firebase.User> {
        return this.auth.authState.pipe(
            switchMap(async (User) => {
                return User;
            }),
        );
    }

    isMaster() {
        return this.getUser().pipe(switchMap(async User => {
            if (User) { // check are user is logged in
                const token = await User.getIdTokenResult()
                return !!token.claims.master;
            } else {
                return false;
            }
        }));
    }

}
