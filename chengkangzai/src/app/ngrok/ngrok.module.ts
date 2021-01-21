import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgrokPage} from './ngrok.page';
import {NgrokPageRoutingModule} from './ngrok-routing.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        NgrokPageRoutingModule
    ],
    declarations: [NgrokPage]
})
export class Tab1PageModule {
}
