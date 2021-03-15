import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'ngrok',
                loadChildren: () => import('../ngrok/ngrok.module').then(m => m.NgrokPageModule)
            },
            {
                path: 'more',
                loadChildren: () => import('../more/more.module').then(m => m.MorePageModule)
            },
            {
                path: '',
                redirectTo: '/tabs/ngrok',
                pathMatch: 'full'
            }, {
                path: 'feedback',
                loadChildren: () => import('../feedback/feedback.module').then(m => m.FeedbackPageModule)
            },
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
