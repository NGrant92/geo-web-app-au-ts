import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';
import { EventAggregator } from 'aurelia-event-aggregator';
import { FolloweeCaches } from "../services/messages";
import { Cache } from "../services/models";

@inject(GeoService, EventAggregator)
export class ListUserCaches {
  geoService: GeoService;
  followeeCaches: Array<Cache>;

  constructor(gs: GeoService, ea: EventAggregator) {
    this.geoService = gs;

    ea.subscribe(FolloweeCaches, msg => {
      this.followeeCaches = msg.followeeCaches as Array<Cache>;
    });
  }
}
