import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgrokPage} from './ngrok.page';
import {NgxAuthFirebaseUIModule} from "ngx-auth-firebaseui";
import {IonicModule} from "@ionic/angular";

const routes: Routes = [
    {
        path: '',
        component: NgrokPage,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), NgxAuthFirebaseUIModule, IonicModule],
    exports: [RouterModule]
})
export class NgrokPageRoutingModule {
}
