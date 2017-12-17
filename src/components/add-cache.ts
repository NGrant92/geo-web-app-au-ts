import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';

@inject(GeoService)
export class AddCache {
  geoService: GeoService;

  name = '';
  location = '';
  latitude = '0';
  longitude = '0';
  description = '';

  constructor(gs: GeoService) {
    this.geoService = gs;
  }

  addCache(){
    this.geoService.addCache(
      this.name,
      this.location,
      parseInt(this.latitude),
      parseInt(this.longitude),
      this.description,
    );
  }
}
