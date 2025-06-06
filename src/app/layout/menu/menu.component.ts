import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuitemComponent } from "./menuitem/menuitem.component";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MenuitemComponent],
})
export class MenuComponent implements OnInit {
model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Ínicio',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
            },
            {
                label: 'Operações',
                items: [
                    { label: 'Caixa', icon: 'pi pi-fw pi-wallet', routerLink: ['/uikit/formlayout'] },

                ]
            },
            {
                label: 'Administração',
                icon: 'pi pi-fw pi-cog',
                routerLink: ['/pages'],
                items: [
                    {
                        label: 'Cardápio',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/landing']
                    },
                    {
                        label: 'Usuários',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Administradores',
                                icon: 'pi pi-fw pi-crown',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Gerentes',
                                icon: 'pi pi-fw pi-star',
                                routerLink: ['/auth/access']
                            },
                            {
                                label: 'Atendentes',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: ['/auth/error']
                            }
                        ]
                    },
                    {
                      label: 'Estoque',
                      icon: 'pi pi-archive',
                      items: [
                        {
                          label: 'Ingredientes',
                          icon: 'pi pi-list',
                          routerLink: ['/estoque/ingredientes']
                        },
                        {
                          label: 'Produtos',
                          icon: 'pi pi-box',
                          routerLink: ['/estoque/produtos']
                        },
                        {
                          label: 'Chocolataria',
                          icon: 'pi pi-heart',
                          routerLink: ['/estoque/chocolataria']
                        }
                      ]
                    }
                ]
            },
            {
              label: 'Relatórios',
              items: [
                {
                  label: 'Vendas',
                  icon: 'pi pi-chart-line',
                  routerLink: ['/relatorios/vendas']
                },
                {
                  label: 'Estatísticas',
                  icon: 'pi pi-chart-bar',
                  routerLink: ['/relatorios/estatisticas']
                }
              ]
            },
            {
              label: 'Suporte',
              items: [
                {
                  label: 'Documentação',
                  icon: 'pi pi-book',
                  routerLink: ['/documentacao']
                },
                {
                  label: 'Chamados Técnicos',
                  icon: 'pi pi-comments',
                  routerLink: ['/suporte/chamados']
                }
              ]
            }
        ];
    }

}
