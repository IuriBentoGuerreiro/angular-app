import { Routes } from '@angular/router';
import { Users } from './components/users/users';
import { UserManager } from './components/user-manager/user-manager';

export const routes: Routes = [

  {
    path: 'users',
    component: Users
  },

  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },

  {
    path: 'user-manager/:id',
    component: UserManager
  }
];
