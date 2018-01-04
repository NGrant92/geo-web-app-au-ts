import { inject } from 'aurelia-framework';
import { GeoService } from "../services/geo-service";
import { EventAggregator } from 'aurelia-event-aggregator';
import { CurrUserFollowers, FoundUserFollowees, GetUser } from "../services/messages";
import { User } from '../services/models';

@inject(GeoService, EventAggregator)
export class ProfileCard{
  geoService: GeoService;
  user = null;
  isLoggedUser: boolean = false;
  isUserFollowing: boolean = false;
  followerList: Array<User>;
  followeeList: Array<User>;

  constructor(gs: GeoService, ea: EventAggregator){
    this.geoService = gs;

    ea.subscribe(GetUser, msg => {
      this.user = msg.foundUser as User;

      this.isLoggedUser = this.user._id === this.geoService.currUser._id;

      //looping through the logged in user's list of people they're following to see
      //if logged user is following the person they're viewing
      this.isUserFollowing = false;
      for(let followee of this.geoService.currUserFollowees){
        if(followee._id === this.user._id){
          return this.isUserFollowing = true;
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
    this.isUserFollowing = true;
  }

  removeFollowing(){
    this.geoService.removeFollower(this.user._id);
    this.isUserFollowing = false;
  }
}
