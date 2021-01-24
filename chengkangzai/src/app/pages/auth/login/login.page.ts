import {Component} from '@angular/core';
import {AuthProvider} from "ngx-auth-firebaseui";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {Subscription} from "rxjs";
import {AlertController, Platform, ToastController} from "@ionic/angular";

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
        private alertController: AlertController,
        private toaster: ToastController
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

    async onAuthSuccess(event: Event) {
        await this.router.navigateByUrl('tabs/ngrok');
    }

    async onAuthError(event: Event) {
        const toast = await this.toaster.create({
            message: 'There might be some problem with your internet connection , please try later',
            duration: 2500,
        })
        return await toast.present();
    }

}
