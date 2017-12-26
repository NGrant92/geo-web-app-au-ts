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
        route: 'viewuser',
        name: 'viewuser',
        moduleId: 'components/view-user-dashboard',
        nav: true,
        title: 'View User',
      },
    ]);
    this.router = router;
  }
}
