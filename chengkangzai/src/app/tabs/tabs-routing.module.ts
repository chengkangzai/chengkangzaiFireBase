import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {AuthGuard} from "../services/auth-guard.service";

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'ngrok',
                canLoad: [AuthGuard],
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
