import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';
import { EventAggregator } from 'aurelia-event-aggregator';
import {Caches, GetUser} from "../services/messages";
import { Cache } from "../services/models";

@inject(GeoService, EventAggregator)
export class ListUserCaches {
  geoService: GeoService;
  userCaches: Array<Cache> = [];

  constructor(gs: GeoService, ea: EventAggregator) {
    this.geoService = gs;

    ea.subscribe(Caches, msg => {
      this.userCaches = [];
      msg.cacheList.forEach(cache => {
        if(cache.user._id === this.geoService.foundUser._id){
          this.userCaches.push(cache);
        }
      });
    });
  }
}
