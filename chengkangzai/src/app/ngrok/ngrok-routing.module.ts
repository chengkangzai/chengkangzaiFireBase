import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgrokPage} from './ngrok.page';

const routes: Routes = [
    {
        path: '',
        component: NgrokPage,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NgrokPageRoutingModule {
}
