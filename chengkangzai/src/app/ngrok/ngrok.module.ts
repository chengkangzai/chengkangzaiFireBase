import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgrokPage} from './ngrok.page';
import {NgrokPageRoutingModule} from './ngrok-routing.module';
import {ClipboardModule} from "@angular/cdk/clipboard";
import {NgxAuthFirebaseUIModule} from "ngx-auth-firebaseui";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        NgrokPageRoutingModule,
        ClipboardModule,
        NgxAuthFirebaseUIModule
    ],
    declarations: [NgrokPage]
})
export class Tab1PageModule {
}
