import { RouterConfiguration, Router } from 'aurelia-router';

export class Home {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'home'],
        name: 'dashboard',
        moduleId: 'components/dashboard',
        nav: true,
        title: 'Home',
      },
      {
        route: 'logout',
        name: 'logout',
        moduleId: 'components/logout',
        nav: true,
        title: 'Logout',
      },
      {
        route: 'viewuser/:userid',
        name: 'viewuser',
        moduleId: 'components/dashboard-view-user',
        nav: false,
        title: 'View User',
      },
    ]);
    this.router = router;
  }
}
