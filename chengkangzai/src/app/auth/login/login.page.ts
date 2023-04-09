import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AlertController, IonicModule, Platform, ToastController} from '@ionic/angular';
import {AuthProvider, NgxAuthFirebaseUIModule} from "ngx-auth-firebaseui";
// @ts-ignore
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {User} from "@firebase/auth-types";
import firebase from "firebase/compat";
import AuthError = firebase.auth.AuthError;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NgxAuthFirebaseUIModule],
  animations: []
})
export class LoginPage implements OnInit {

  providers = AuthProvider;
  authSub: Subscription | null;
  isPhone = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private alertController: AlertController,
    private toaster: ToastController
  ) {
    console.log('as');
    this.authSub = null;
  }

  ionViewWillEnter() {
    if (
      this.platform.is('hybrid') &&
      (this.platform.is('android') || this.platform.is('ios'))
    ) {
      this.isPhone = true;
    }

    this.authSub = this.afAuth.authState.subscribe(async (user: User | null) => {
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
      message: `Welcome back ! ${$event?.providerData[0]?.displayName ?? ''}`,
      duration: 1000,
      position: 'top'
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

  ngOnInit(): void {
  }


}
