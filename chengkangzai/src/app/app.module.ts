import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {NgxAuthFirebaseUIModule} from "ngx-auth-firebaseui";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        NgxAuthFirebaseUIModule.forRoot(environment.firebaseConfig, () => 'chengkangzai', {
            enableFirestoreSync: true, // enable/disable autosync users with firestore
            authGuardFallbackURL: '/login', // url for unauthenticated users - to use in combination with canActivate feature on a route
            authGuardLoggedInURL: '/tabs/ngrok', // url for authenticated users - to use in combination with canActivate feature on a route
            passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
            // Same as password but for the name
            nameMaxLength: 50,
            nameMinLength: 2,
            enableEmailVerification: false,
            guardProtectedRoutesUntilEmailIsVerified:false,
        }),
        BrowserAnimationsModule
    ],

    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
