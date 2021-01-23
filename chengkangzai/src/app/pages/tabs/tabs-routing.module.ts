import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {LoggedInGuard} from "ngx-auth-firebaseui";

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        canActivate: [LoggedInGuard],
        children: [
            {
                path: 'ngrok',
                loadChildren: () => import('../ngrok/ngrok.module').then(m => m.Tab1PageModule)
            },
            {
                path: 'more',
                loadChildren: () => import('../more/more.module').then(m => m.MorePageModule)
            },
            {
                path: '',
                redirectTo: '/tabs/ngrok',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/ngrok',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
