import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';
import { MessagePost } from "../services/models";

@inject(GeoService)
export class ListUserMessages {
  geoService: GeoService;
  userMessagePosts: Array<MessagePost> = [];

  constructor(gs: GeoService) {
    this.geoService = gs;

    this.geoService.messagePosts.forEach(post => {
      if(post.user._id === this.geoService.currUser._id){
        this.userMessagePosts.push(post);
      }
    });
  }
}
