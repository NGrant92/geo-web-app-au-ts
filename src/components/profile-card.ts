import { inject } from 'aurelia-framework';
import { GeoService } from "../services/geo-service";
import { EventAggregator } from 'aurelia-event-aggregator';
import { CurrentUser } from "../services/messages";
import { User } from '../services/models';

@inject(GeoService, EventAggregator)
export class ProfileCard{
  geoService: GeoService;
  ea: EventAggregator;
  user: User;

  constructor(gs: GeoService, ea: EventAggregator){
    this.geoService = gs;
    //this.user = this.geoService.currUser;

    ea.subscribe(CurrentUser, msg => {
      this.user = msg.currUser;
    })

  }
}
