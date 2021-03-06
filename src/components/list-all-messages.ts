import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';
import { EventAggregator } from 'aurelia-event-aggregator';
import {MessagePost, User} from "../services/models";
import { MessagePosts } from "../services/messages";

@inject(GeoService, EventAggregator)
export class ListAllMessages {
  geoService: GeoService;
  allMessagePosts: Array<MessagePost>;

  constructor(gs: GeoService, ea: EventAggregator) {
    this.geoService = gs;

    ea.subscribe(MessagePosts, msg => {
      this.allMessagePosts = msg.messageList;
    });
  }
}
