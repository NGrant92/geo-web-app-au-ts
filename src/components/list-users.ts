import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';
import {MessagePost, User} from "../services/models";

@inject(GeoService)
export class ListUserMessages {
  geoService: GeoService;
  userList: Map<string, User> = new Map();

  constructor(gs: GeoService) {
    this.geoService = gs;

    const users = this.geoService.users;
    users.forEach(user => {
      if(!user.admin){
        this.userList.set(user.email.toString(), user);
      }
    });
  }
}
