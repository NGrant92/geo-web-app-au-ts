import { inject } from 'aurelia-framework';
import { GeoService } from "../services/geo-service";
import { User } from '../services/models';

@inject(GeoService)
export class ProfileCard{
  geoService: GeoService;
  user: User;

  constructor(gs){
    this.geoService = gs;
    this.user = this.geoService.currUser;
  }
}
