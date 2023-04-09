import {enableProdMode, importProvidersFrom} from '@angular/core';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy, provideRouter, RouterModule} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {routes} from './app/app.routes';
import {AppComponent} from './app/app.component';
import {environment} from './environments/environment';
import {AngularFireModule} from "@angular/fire/compat";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getFunctions, provideFunctions} from "@angular/fire/functions";
import {NgxAuthFirebaseUIModule} from 'ngx-auth-firebaseui';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    importProvidersFrom(IonicModule.forRoot({}), BrowserAnimationsModule),
    importProvidersFrom(AngularFireModule.initializeApp(environment.firebase)),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideFunctions(() => getFunctions())),
    importProvidersFrom(NgxAuthFirebaseUIModule.forRoot(environment.firebase,
      () => 'chengkangzai',
      {
        enableFirestoreSync: true, // enable/disable autosync users with firestore
        authGuardFallbackURL: '/login', // url for unauthenticated users - to use in combination with canActivate feature on a route
        authGuardLoggedInURL: '/tabs/ngrok', // url for authenticated users - to use in combination with canActivate feature on a route
        passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
        nameMaxLength: 50,
        nameMinLength: 2,
        enableEmailVerification: true,
        guardProtectedRoutesUntilEmailIsVerified: false,
        toastMessageOnAuthSuccess: false,
        toastMessageOnAuthError: false
      })),

    provideRouter(routes),
  ],
});
