import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoggedInGuard} from "ngx-auth-firebaseui";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tabs',
    },
    {
        path: 'tabs',
        canActivate: [LoggedInGuard],
        loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule)
    },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
