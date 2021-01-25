import {Component} from '@angular/core';
import {AuthProvider} from 'ngx-auth-firebaseui';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Subscription} from 'rxjs';
import {AlertController, Platform, ToastController} from '@ionic/angular';
import firebase from 'firebase';
import AuthError = firebase.auth.AuthError;
import User = firebase.User;

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
        });
    }

    ionViewWillLeave() {
        if (this.authSub) {
            this.authSub.unsubscribe();
        }
    }

    async onAuthSuccess($event: User) {
        const toast = await this.toaster.create({
            message: `Welcome back ! ${$event.providerData[0].displayName}`,
            duration: 5000,
        });
        await toast.present();
        await this.router.navigateByUrl('tabs/ngrok');
    }

    async onAuthError(event: AuthError) {
        const toast = await this.toaster.create({
            message: event.message,
            duration: 5000,
        });
        await toast.present();
    }

}
