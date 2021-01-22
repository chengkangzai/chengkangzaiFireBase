import {Component} from '@angular/core';
import {AuthProvider} from "ngx-auth-firebaseui";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {Subscription} from "rxjs";


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage {

    providers = AuthProvider;
    authSub: Subscription;

    constructor(private router: Router, private firebase: AngularFireAuth) {
    }

    ionViewWillEnter() {
        this.authSub = this.firebase.authState.subscribe(async user => {
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

    async onSuccess(event: Event) {
        await this.router.navigateByUrl('tabs/ngrok')
    }
}
