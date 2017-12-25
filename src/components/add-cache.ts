import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';

@inject(GeoService)
export class AddCache {
  geoService: GeoService;

  //test text to be removed
  name = 'Under the Tree';
  location = 'At Spar';
  latitude = '11';
  longitude = '22';
  description = 'Just like the jingle';

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
