import * as $ from 'jquery';
import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';

@inject(GeoService)
export class Dashboard {
  geoService: GeoService;

  constructor(gs: GeoService) {
    this.geoService = gs;
    this.geoService.getLoggedUser();
    this.geoService.getMessagePosts();
    this.geoService.getCaches();
    this.geoService.getFolloweeCaches();
    this.geoService.getFolloweeMessages();
    this.geoService.getUsers();
  }

  attached(){
    $(document).ready(function(){
      $('.menu .item').tab({history:false});
    });
  }
}
