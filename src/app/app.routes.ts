import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { LayoutComponent } from './layout/layout.component';
import { Dashboard } from './pages/dashboard/dashboard';
import { CaixaComponent } from './pages/caixa/caixa.component';
import { CaixaVisualizarHistoricoComponent } from './pages/caixa/pages/caixa-visualizar-historico/caixa-visualizar-historico.component';


export const routes: Routes = [
  {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: Dashboard, data: { breadcrumb: 'Inicio' } },
            { path: 'documentation', component: AboutComponent, data: { breadcrumb: 'Documentação' } },
            { path: 'caixa', component: CaixaComponent, data: { breadcrumb: 'Caixa' }},
            { path: 'caixa-historico', component: CaixaVisualizarHistoricoComponent, data: { breadcrumb: 'Histórico de Caixas', parentBreadcrumb: 'Caixa', parentRouterLink: '/caixa' } },

        ]
    },
    { path: '**', redirectTo: '/notfound' }
];
