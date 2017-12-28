import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { GeoService } from '../services/geo-service';
import {GetUser, MessagePosts} from "../services/messages";
import { MessagePost } from "../services/models";

@inject(GeoService, EventAggregator)
export class ListUserMessages {
  geoService: GeoService;
  userMessagePosts: Array<MessagePost> = [];

  constructor(gs: GeoService, ea: EventAggregator) {
    this.geoService = gs;

    ea.subscribe(MessagePosts, msg => {
      this.userMessagePosts  = [];
      msg.messageList.forEach(post => {
        if(post.user._id === this.geoService.foundUser._id){
          this.userMessagePosts.push(post);
        }
      });
      console.log("User Message Posts subscription called");
    });

    //used for when dashboard-view-user.ts is called so it correctly loads
    ea.subscribe(GetUser, msg => {
      this.userMessagePosts  = [];
      this.geoService.messagePosts.forEach(post => {
        if(post.user._id === this.geoService.foundUser._id){
          this.userMessagePosts.push(post);
        }
      });
      console.log("GetUser Message Posts subscription called");
    });
  }
}
