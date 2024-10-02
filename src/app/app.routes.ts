import { Routes } from '@angular/router';

export const routes: Routes = [
// add route for settings
{
  path: 'settings',
  loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent)
},
];
