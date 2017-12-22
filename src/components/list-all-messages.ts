import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';
import { MessagePost } from "../services/models";

@inject(GeoService)
export class ListAllMessages {
  geoService: GeoService;
  messagePosts: Array<MessagePost>;

  constructor(gs: GeoService) {
    this.geoService = gs;
    this.messagePosts = this.geoService.messagePosts;
    console.log("list messages: " + this.messagePosts[0].user);
  }
}
