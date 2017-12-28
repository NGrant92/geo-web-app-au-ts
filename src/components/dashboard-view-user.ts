import * as $ from 'jquery'
import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';
import { EventAggregator } from 'aurelia-event-aggregator';
import { GetUser } from "../services/messages";
import { User } from "../services/models";

@inject(GeoService, EventAggregator)
export class DashboardViewUser {
  geoService: GeoService;
  user = null;

  constructor(gs: GeoService, ea: EventAggregator) {
    this.geoService = gs;
    this.geoService.getLoggedUser();
    this.geoService.getMessagePosts();
    this.geoService.getCaches();
    this.geoService.getUsers();

    ea.subscribe(GetUser, msg => {
      this.user = msg.foundUser as User;
      console.log("Found User EA subscription called");
    });
  }

  attached(){
    $(document).ready(function(){
      $('.menu .item').tab({history:false});
    });
  }
}
