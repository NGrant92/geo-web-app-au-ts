import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Users } from "../services/messages";
import { User } from "../services/models";

@inject(GeoService, EventAggregator)
export class ListUserMessages {
  geoService: GeoService;
  userList: Map<string, User> = new Map();

  constructor(gs: GeoService, ea: EventAggregator) {
    this.geoService = gs;

    ea.subscribe( Users, msg => {
      const users = msg.userMap;
      users.forEach(user => {
        if(!user.admin){
          this.userList.set(user.email.toString(), user);
        }
      });
    });
  }
}
