import { inject } from 'aurelia-framework';
import { GeoService } from "../services/geo-service";
import { EventAggregator } from 'aurelia-event-aggregator';
import {CurrentUser, CurrUserFollowees, CurrUserFollowers, GetUser} from "../services/messages";
import {Following, User} from '../services/models';

@inject(GeoService, EventAggregator)
export class ProfileCard{
  geoService: GeoService;
  user = null;
  isLoggedUser: boolean = false;
  isFollowing: boolean = false;
  followerList: Array<User>;
  followeeList: Array<User>;

  constructor(gs: GeoService, ea: EventAggregator){
    this.geoService = gs;

    ea.subscribe(GetUser, msg => {
      const foundUser = msg.foundUser as User;
      this.user = foundUser;

      this.isLoggedUser = foundUser._id === this.geoService.currUser._id;
    });

    ea.subscribe(CurrUserFollowers, msg => {
      this.followerList = msg.followerList;
    });

    ea.subscribe(CurrUserFollowees, msg => {
      this.followeeList = msg.followeeList;
    });
  }

  addFollowing(){
    this.geoService.addFollower(this.user._id);
  }
}
