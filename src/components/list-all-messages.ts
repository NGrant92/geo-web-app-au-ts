import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';
import { MessagePost } from "../services/models";

@inject(GeoService)
export class ListAllMessages {
  geoService: GeoService;
  allMessagePosts: Array<MessagePost>;

  constructor(gs: GeoService) {
    this.geoService = gs;
    this.allMessagePosts = this.geoService.messagePosts;
  }
}
