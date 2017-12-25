import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { GeoService } from '../services/geo-service';
import { UserMessagePosts } from "../services/messages";
import { MessagePost } from "../services/models";

@inject(GeoService, EventAggregator)
export class ListUserMessages {
  geoService: GeoService;
  userMessagePosts: Array<MessagePost> = [];

  constructor(gs: GeoService, ea: EventAggregator) {
    this.geoService = gs;

    ea.subscribe(UserMessagePosts, msg => {
      msg.messageList.forEach(post => {
        if(post.user._id === this.geoService.currUser._id){
          this.userMessagePosts.push(post);
        }
      });
      console.log("User Message Posts subcription called");
    });
  }
}
