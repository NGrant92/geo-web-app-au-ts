import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';

@inject(GeoService)
export class Signup {
  geoService: GeoService;

  firstName = 'Marge';
  lastName = 'Simpson';
  email = 'marge@simpson.com';
  password = 'secret';

  constructor(gs: GeoService) {
    this.geoService = gs;
  }

  login(e) {
    console.log(`Trying to log in ${this.email}`);
    this.geoService.login(this.email, this.password);
  }

  register(e) {
    this.geoService.addUser(
      this.firstName,
      this.lastName,
      this.email,
      this.password,
    );
    this.geoService.login(this.email, this.password);
  }
}
