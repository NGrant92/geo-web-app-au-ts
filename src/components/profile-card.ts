import { inject } from 'aurelia-framework';
import { GeoService } from "../services/geo-service";
import { EventAggregator } from 'aurelia-event-aggregator';
import {
  CurrentUser, CurrUserFollowees, CurrUserFollowers, FoundUserFollowees,
  GetUser
} from "../services/messages";
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

      //looping through the logged in user's list of people they're following to see
      //if logged user is following the person they're viewing
      this.isFollowing = false;
      console.log(this.geoService.currUserFollowees);
      for(let followee of this.geoService.currUserFollowees){
        console.log(followee.firstName);
        if(followee._id === foundUser._id){
          return this.isFollowing = true;
        }
      }
    });

    ea.subscribe(CurrUserFollowers, msg => {
      this.followerList = msg.followerList;
    });

    ea.subscribe(FoundUserFollowees, msg => {
      this.followeeList = msg.followeeList;
    });
  }

  addFollowing(){
    this.geoService.addFollower(this.user._id);
  }
}
