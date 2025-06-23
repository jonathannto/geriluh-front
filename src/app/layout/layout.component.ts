import { Component, Renderer2, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, NavigationEnd, Router, RouterModule, ActivatedRoute } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { LayoutService } from '../service/layout.service'; // Seu serviço de layout
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FooterComponent, RouterOutlet, CommonModule, BreadcrumbModule],
})
export class LayoutComponent implements OnInit, OnDestroy {

    overlayMenuOpenSubscription: Subscription;

    menuOutsideClickListener: any;

    @ViewChild(SidebarComponent) appSidebar!: SidebarComponent;

    @ViewChild(HeaderComponent) appTopBar!: HeaderComponent;

        // --- Propriedades do Breadcrumb ---
    items: MenuItem[] = [];
    home: MenuItem;
    private breadcrumbRouterSubscription: Subscription | undefined; // Nova subscription para o breadcrumb
    // ----------------------------------


    constructor(
        public layoutService: LayoutService,
        private activatedRoute: ActivatedRoute,
        public renderer: Renderer2,
        public router: Router
    ) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', (event) => {
                    if (this.isOutsideClicked(event)) {
                        this.hideMenu();
                    }
                });
            }

            if (this.layoutService.layoutState().staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
            this.hideMenu();
        });

        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }

  ngOnInit(): void {
    this.breadcrumbRouterSubscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.items = this.buildBreadcrumbs(this.activatedRoute.root);
            });

        // Chama uma vez no início para garantir que o breadcrumb seja carregado na inicialização
        this.items = this.buildBreadcrumbs(this.activatedRoute.root);
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    for (const child of children) {
      if (child.snapshot.url.length > 0) {
        const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
        const newUrl = `${url}/${routeURL}`;
        const breadcrumbLabel = child.snapshot.data['breadcrumb'];
        const parentBreadcrumb = child.snapshot.data['parentBreadcrumb']; // Nova propriedade
        const parentRouterLink = child.snapshot.data['parentRouterLink']; // Nova propriedade

        if (parentBreadcrumb && parentRouterLink) {
          // Se existir um pai lógico, adicione-o primeiro
          breadcrumbs.push({ label: parentBreadcrumb, routerLink: parentRouterLink });
        }

        if (breadcrumbLabel) {
          breadcrumbs.push({ label: breadcrumbLabel, routerLink: newUrl });
        }

        return this.buildBreadcrumbs(child, newUrl, breadcrumbs); // Continua a recursão
      } else if (child.children.length > 0) {
        // Se a rota pai não tem um segmento de URL mas tem filhos, continue a recursão
        return this.buildBreadcrumbs(child, url, breadcrumbs);
      } else if (child.snapshot.data['breadcrumb']) {
        // Se a rota tem um label de breadcrumb mas não é um segmento de URL próprio (ex: path: '')
        const breadcrumbLabel = child.snapshot.data['breadcrumb'];
        breadcrumbs.push({ label: breadcrumbLabel, routerLink: url || '/' }); // Link para a URL atual (ou raiz)
      }
    }
    return breadcrumbs;
  }

    isOutsideClicked(event: MouseEvent) {
        const sidebarEl = document.querySelector('.layout-sidebar');
        const topbarEl = document.querySelector('.layout-menu-button');
        const eventTarget = event.target as Node;

        return !(sidebarEl?.isSameNode(eventTarget) || sidebarEl?.contains(eventTarget) || topbarEl?.isSameNode(eventTarget) || topbarEl?.contains(eventTarget));
    }

    hideMenu() {
        this.layoutService.layoutState.update((prev) => ({ ...prev, overlayMenuActive: false, staticMenuMobileActive: false, menuHoverActive: false }));
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    get containerClass() {
        return {
            'layout-overlay': this.layoutService.layoutConfig().menuMode === 'overlay',
            'layout-static': this.layoutService.layoutConfig().menuMode === 'static',
            'layout-static-inactive': this.layoutService.layoutState().staticMenuDesktopInactive && this.layoutService.layoutConfig().menuMode === 'static',
            'layout-overlay-active': this.layoutService.layoutState().overlayMenuActive,
            'layout-mobile-active': this.layoutService.layoutState().staticMenuMobileActive
        };
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }

        if (this.breadcrumbRouterSubscription) {
            this.breadcrumbRouterSubscription.unsubscribe();
        }
    }

}
