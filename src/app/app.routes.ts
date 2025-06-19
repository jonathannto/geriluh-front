import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { LayoutComponent } from './layout/layout.component';
import { Dashboard } from './pages/dashboard/dashboard';
import { CaixaComponent } from './pages/caixa/caixa.component';


export const routes: Routes = [
  {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: Dashboard },
            { path: 'documentation', component: AboutComponent },
            { path: 'caixa', component: CaixaComponent}

        ]
    },
    { path: '**', redirectTo: '/notfound' }
];
