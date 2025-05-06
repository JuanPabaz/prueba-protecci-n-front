import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./business/components/auth/login/login.component')
    },
    {
        path: 'register',
        loadComponent: () => import('./business/components/auth/register/register.component')
    },
    {
        path:'home',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        children:[
            {
                path:'tasks',
                loadComponent: () => import('./business/components/tasks/task-list/task-list.component')
            },
            {
                path: '',
                redirectTo: 'tasks',
                pathMatch: 'full'
            }
        ]
    }
];
