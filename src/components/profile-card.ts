import { inject } from 'aurelia-framework';
import { GeoService } from "../services/geo-service";
import { EventAggregator } from 'aurelia-event-aggregator';
import { CurrentUser } from "../services/messages";
import { User } from '../services/models';

@inject(GeoService, EventAggregator)
export class ProfileCard{
  geoService: GeoService;
  user = null;

  constructor(gs: GeoService, ea: EventAggregator){
    this.geoService = gs;

    ea.subscribe(CurrentUser, msg => {
      this.user = msg.currUser as User;
      console.log("message user: ");
      console.log(msg.currUser.firstName);
    });
  }
}
