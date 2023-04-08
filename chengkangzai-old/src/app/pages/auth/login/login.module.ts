import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {LoginPageRoutingModule} from './login-routing.module';

import {LoginPage} from './login.page';
import {NgxAuthFirebaseUIModule} from 'ngx-auth-firebaseui';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        LoginPageRoutingModule,
        NgxAuthFirebaseUIModule
    ],
    declarations: [LoginPage]
})
export class LoginPageModule {
}
