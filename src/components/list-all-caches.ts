import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';
import { Cache } from "../services/models";

@inject(GeoService)
export class ListAllMessages {
  geoService: GeoService;
  allCaches: Array<Cache>;

  constructor(gs: GeoService) {
    this.geoService = gs;
    this.allCaches = this.geoService.caches;
  }
}
