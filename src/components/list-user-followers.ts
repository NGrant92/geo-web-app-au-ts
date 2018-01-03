import { inject } from 'aurelia-framework';
import { GeoService } from "../services/geo-service";
import { EventAggregator } from 'aurelia-event-aggregator';
import {CurrentUser, CurrUserFollowers, GetUser} from "../services/messages";
import {Following, User} from '../services/models';

@inject(GeoService, EventAggregator)
export class ProfileCard{
  geoService: GeoService;
  followerList: Array<User>;

  constructor(gs: GeoService, ea: EventAggregator){
    this.geoService = gs;

    ea.subscribe(CurrUserFollowers, msg => {
      this.followerList = msg.followerList;
    });
  }
}
