import { inject, Aurelia } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LoginStatus } from './services/messages';
import { GeoService } from './services/geo-service';

@inject(Aurelia, EventAggregator, GeoService)
export class App {
  router: Router;
  au: Aurelia;
  gs: GeoService;

  constructor(au: Aurelia, ea: EventAggregator, gs: GeoService) {
    this.au = au;
    this.gs = gs;

    ea.subscribe(LoginStatus, msg => {
      this.router.navigate('/', { replace: true, trigger: false });
      this.router.reset();
      if (msg.status === true) {
        au.setRoot('home');
      } else {
        au.setRoot('app');
      }
    });
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'login'],
        name: 'login',
        moduleId: 'components/login',
        nav: true,
        title: 'Login',
      },
      {
        route: 'signup',
        name: 'signup',
        moduleId: 'components/signup',
        nav: true,
        title: 'Signup',
      },
    ]);
    this.router = router;
  }

  attached() {
    if (this.gs.isAuthenticated()) {
      this.au.setRoot('home').then(() => {
        this.router.navigateToRoute('dashboard');
      });
    }
  }
}
