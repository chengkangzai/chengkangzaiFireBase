import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FeedbackPage} from './feedback.page';
import {canActivate, hasCustomClaim} from "@angular/fire/auth-guard";

const masterOnly = () => hasCustomClaim('master')

const routes: Routes = [
    {
        path: '',
        component: FeedbackPage
    },
    {
        path: 'view',
        ...canActivate(masterOnly),
        loadChildren: () => import('./view/view.module').then(m => m.ViewPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FeedbackPageRoutingModule {
}
