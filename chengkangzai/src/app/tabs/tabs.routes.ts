import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'ngrok',
        loadComponent: () =>
          import('../ngrok/ngrok.page').then((m) => m.NgrokPage),
      },
      {
        path: 'more',
        loadComponent: () =>
          import('../more/more.page').then((m) => m.MorePage),
      },
      {
        path: '',
        redirectTo: '/tabs/ngrok',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/ngrok',
    pathMatch: 'full',
  },
];
