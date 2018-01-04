import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';
import { EventAggregator } from 'aurelia-event-aggregator';
import {FolloweeCaches, FolloweeMessages} from "../services/messages";
import {Cache, MessagePost} from "../services/models";

@inject(GeoService, EventAggregator)
export class ListUserCaches {
  geoService: GeoService;
  followeeMessages: Array<MessagePost>;

  constructor(gs: GeoService, ea: EventAggregator) {
    this.geoService = gs;

    ea.subscribe(FolloweeMessages, msg => {
      this.followeeMessages = msg.followeeMessages as Array<MessagePost>;
    });
  }
}
