import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MorePage} from './more.page';

import {MorePageRoutingModule} from './more-routing.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        MorePageRoutingModule
    ],
    declarations: [MorePage]
})
export class MorePageModule {
}
