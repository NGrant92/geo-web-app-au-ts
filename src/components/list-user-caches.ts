import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';
import { Cache } from "../services/models";

@inject(GeoService)
export class ListUserCaches {
  geoService: GeoService;
  userCaches: Array<Cache> = [];

  constructor(gs: GeoService) {
    this.geoService = gs;

    this.geoService.caches.forEach(cache => {
      if(cache.user._id === this.geoService.currUser._id){
        this.userCaches.push(cache);
      }
    });
  }
}
