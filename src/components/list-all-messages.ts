import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';
import { MessagePost } from "../services/models";

@inject(GeoService)
export class ListAllMessages {
  geoService: GeoService;
  messagePosts: Array<MessagePost>;

  constructor(gs: GeoService) {
    this.geoService = gs;
    this.geoService.getMessagePosts();
    this.messagePosts = gs.messagePosts;
    console.log("all messages");
    console.log("all messages: " + this.messagePosts);
  }
}
