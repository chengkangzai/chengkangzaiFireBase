import {Injectable} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {AngularFireAuth} from "@angular/fire/compat/auth";
// @ts-ignore
import {Observable} from "rxjs";
import {User} from "@firebase/auth-types";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(
    private auth: AngularFireAuth
  ) {
  }

  getUser(): Observable<User | null> {
    return this.auth.authState.pipe(
      switchMap(async (User) => {
        return User;
      }),
    );
  }

  isMaster() {
    return this.getUser().pipe(switchMap(async user => {
      if (user) {
        // @ts-ignore
        const token = await user.getIdTokenResult();
        return !!token.claims['master'];
      } else {
        return false;
      }
    }));
  }

}
