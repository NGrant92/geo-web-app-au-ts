import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';

@inject(GeoService)
export class Login {
  geoService: GeoService;
  email = 'homer@simpson.com';
  password = 'secret';

  constructor(gs: GeoService) {
    this.geoService = gs;
  }

  login(e) {
    console.log(`Trying to log in ${this.email}`);
    this.geoService.login(this.email, this.password);
  }
}
