import {Routes} from '@angular/router';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/compat/auth-guard";

const redirectLoggedInToItems = () => redirectLoggedInTo(['tabs/ngrok']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
export const routes: Routes = [
  {
    path: 'login',
    ...canActivate(redirectLoggedInToItems),
    loadComponent: () => import('../app/auth/login/login.page').then((m) => m.LoginPage)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tabs',
  },
  {
    path: '',
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
];
