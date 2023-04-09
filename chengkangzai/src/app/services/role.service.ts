import {Injectable} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Observable} from "rxjs/dist/types/internal/Observable";
import {User} from "@firebase/auth-types";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(
    private auth: AngularFireAuth
  ) {
  }

  getUser(): Observable<User> {
    return this.auth.authState.pipe(
      switchMap(async (User) => {
        return User;
      }),
    );
  }

  isMaster() {
    return this.getUser().pipe(switchMap(async User => {
      if (User) { // check are user is logged in
        const token = await User.getIdTokenResult();
        return !!token.claims.master;
      } else {
        return false;
      }
    }));
  }

}
