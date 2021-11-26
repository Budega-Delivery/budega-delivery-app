import browser from 'browser-detect';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment as env } from '../../environments/environment';

import {
  authLogin,
  authLogout,
  routeAnimations,
  LocalStorageService,
  selectIsAuthenticated,
  selectSettingsStickyHeader,
  selectSettingsLanguage,
  selectEffectiveTheme
} from '../core/core.module';
import {
  actionSettingsChangeAnimationsPageDisabled,
  actionSettingsChangeLanguage
} from '../core/settings/settings.actions';
import { BreakpointObserver } from '@angular/cdk/layout';

/*
 * TODO: Criar carrinho
 * TODO: Ajustar navbar e icones
 * TODO:
 * */

@Component({
  selector: 'budega-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: any;

  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  // logo = require('../../assets/logo.webp').default;
  logo = '';
  isSmallScreen: boolean;
  sideNavOpened = true;
  // languages = ['en', 'de', 'sk', 'fr', 'es', 'pt-br', 'zh-cn', 'he'];
  languages = ['en', 'es', 'pt-br'];
  navigation = [
    { link: 'loja', label: 'budega.menu.store', roles: ['client', 'public'] },
    {
      link: 'admin/produtos',
      label: 'budega.menu.products',
      roles: ['manager', 'stockist']
    },
    { link: 'admin/painel', label: 'budega.menu.manager', roles: ['manager'] },
    { link: 'admin/usuarios', label: 'budega.menu.users', roles: ['manager'] },
    {
      link: 'admin/deliveries',
      label: 'budega.menu.deliveries',
      roles: ['manager', 'deliveryperson', 'stockist']
    }
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'budega.menu.settings', roles: ['public'] }
  ];

  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;

  constructor(
    private store: Store,
    private storageService: LocalStorageService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.isSmallScreen =
      this.breakpointObserver.isMatched('(max-width: 830px)');
    if (this.isSmallScreen) this.sideNavOpened = false;
  }

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.storageService.testLocalStorage();
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        actionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }

    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
  }

  onLoginClick() {
    this.store.dispatch(authLogin());
  }

  onLogoutClick() {
    this.store.dispatch(authLogout());
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(actionSettingsChangeLanguage({ language }));
  }

  sideNavToggle() {
    this.sidenav.toggle();
    this.sideNavOpened = this.isSmallScreen ? false : !this.sideNavOpened;
  }
}
