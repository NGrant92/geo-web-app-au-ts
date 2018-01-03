import { inject } from 'aurelia-framework';
import { GeoService } from "../services/geo-service";
import { EventAggregator } from 'aurelia-event-aggregator';
import {CurrentUser, CurrUserFollowers, GetUser} from "../services/messages";
import {Following, User} from '../services/models';

@inject(GeoService, EventAggregator)
export class ProfileCard{
  geoService: GeoService;
  user = null;
  isLoggedUser: boolean = false;
  isFollowing: boolean = false;
  followerList: Array<Following>;

  constructor(gs: GeoService, ea: EventAggregator){
    this.geoService = gs;

    ea.subscribe(GetUser, msg => {
      const foundUser = msg.foundUser as User;
      this.user = foundUser;

      if(foundUser._id === this.geoService.currUser._id){
        this.isLoggedUser = true;
      }
      console.log("Get User EA subscription called");
    });

    ea.subscribe(CurrUserFollowers, msg => {
      this.followerList = msg.followerList;
      console.log("Curr User Followers EA subscription called");
    });
  }
}
