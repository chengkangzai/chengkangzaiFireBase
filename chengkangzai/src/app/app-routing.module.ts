import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectLoggedInToItems = () => redirectLoggedInTo(['tabs/ngrok']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tabs',
    },
    {
        path: 'tabs',
        ...canActivate(redirectUnauthorizedToLogin),
        loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'login',
        ...canActivate(redirectLoggedInToItems),
        loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule)
    },  {
    path: 'timetable',
    loadChildren: () => import('./pages/timetable/timetable.module').then( m => m.TimetablePageModule)
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
