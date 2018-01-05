import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';

@inject(GeoService)
export class AddMessage {
  geoService: GeoService;

  //test text to be removed
  message = '';
  image = [];

  constructor(gs: GeoService) {
    this.geoService = gs;
  }

  addMessagePost(){
    const reader = new (window as any).FileReader();
    reader.onload = () => {
      let file = reader.result;
      this.geoService.addMessagePost(this.message, file);
    };

    if (this.image[0]) {
      reader.readAsDataURL(this.image[0]);
    } else {
      this.geoService.addMessagePost(this.message, null);
    }
  }
}
