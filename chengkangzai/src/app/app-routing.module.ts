import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AngularFireAuthGuard, redirectLoggedInTo} from "@angular/fire/auth-guard";

const redirectLoggedInToItem = () => redirectLoggedInTo(['tabs', 'ngrok']);
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tabs',
    },
    {
        path: 'tabs',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'registration',
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectLoggedInToItem},
        loadChildren: () => import('./auth/registration/registration.module').then(m => m.RegistrationPageModule)
    },
    {
        path: 'login',
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectLoggedInToItem},
        loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
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
