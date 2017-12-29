import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';

@inject(GeoService)
export class Signup {
  geoService: GeoService;

  firstName = 'Lisa';
  lastName = 'Simpson';
  email = 'lisa@simpson.com';
  password = 'secret';

  constructor(gs: GeoService) {
    this.geoService = gs;
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
