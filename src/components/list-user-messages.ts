import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';
import { MessagePost } from "../services/models";

@inject(GeoService)
export class ListUserMessages {
  geoService: GeoService;
  userMessagePosts: Array<MessagePost>;

  constructor(gs: GeoService) {
    this.geoService = gs;
    this.userMessagePosts = this.geoService.messagePosts;
  }
}
