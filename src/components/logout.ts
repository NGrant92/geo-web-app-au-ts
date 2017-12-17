import { GeoService } from '../services/geo-service';
import { inject } from 'aurelia-framework';

@inject(GeoService)
export class Logout {
  geoService: GeoService;

  constructor(geoService: GeoService) {
    this.geoService = geoService;
  }

  logout() {
    console.log('logging out');
    this.geoService.logout();
  }
}
