import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Caches } from "../services/messages";
import { Cache } from "../services/models";

@inject(GeoService, EventAggregator)
export class ListAllCaches {
  geoService: GeoService;
  allCaches: Array<Cache>;

  constructor(gs: GeoService, ea: EventAggregator) {
    this.geoService = gs;

    ea.subscribe(Caches, msg => {
      this.allCaches = msg.cacheList;
    });
  }
}
