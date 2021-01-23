import {Component} from '@angular/core';
import {AuthProvider} from "ngx-auth-firebaseui";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {Subscription} from "rxjs";
import {Platform} from "@ionic/angular";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage {

    providers = AuthProvider;
    authSub: Subscription;
    isPhone = false;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private platform: Platform,
    ) {
    }

    ionViewWillEnter() {
        if (
            this.platform.is('hybrid') &&
            (this.platform.is('android') || this.platform.is('ios'))
        ) {
            this.isPhone = true;
        }

        this.authSub = this.afAuth.authState.subscribe(async user => {
            if (user) {
                await this.router.navigateByUrl('tabs/ngrok');
            }
        })
    }

    ionViewWillLeave() {
        if (this.authSub) {
            this.authSub.unsubscribe();
        }
    }

}
