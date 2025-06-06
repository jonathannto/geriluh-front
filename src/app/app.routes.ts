import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { LayoutComponent } from './layout/layout.component';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: Dashboard },
            { path: 'documentation', component: AboutComponent },

        ]
    },
    { path: '**', redirectTo: '/notfound' }
];
