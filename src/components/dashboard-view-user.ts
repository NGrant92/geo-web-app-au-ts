import * as $ from 'jquery'
import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';

@inject(GeoService)
export class DashboardViewUser {
  geoService: GeoService;

  constructor(gs: GeoService) {
    this.geoService = gs;
    this.geoService.getMessagePosts();
    this.geoService.getCaches();
    this.geoService.getUsers();
    this.geoService.getFollowers();
  }

  attached(){
    $(document).ready(function(){
      $('.menu .item').tab({history:false});
    });
  }

  //https://stackoverflow.com/a/43857642
  activate(params){
    this.geoService.getUser(params.userid);
  }
}
