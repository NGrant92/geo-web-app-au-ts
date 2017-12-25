import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';

@inject(GeoService)
export class AddMessage {
  geoService: GeoService;

  //test text to be removed
  message = '';

  constructor(gs: GeoService) {
    this.geoService = gs;
  }

  addMessagePost(){
    this.geoService.addMessagePost(
      this.message
    );
  }
}
