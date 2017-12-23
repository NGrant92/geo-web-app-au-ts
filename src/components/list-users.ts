import { inject } from 'aurelia-framework';
import { GeoService } from '../services/geo-service';
import {MessagePost, User} from "../services/models";

@inject(GeoService)
export class ListUserMessages {
  geoService: GeoService;
  userList: Map<string, User> = new Map();

  constructor(gs: GeoService) {
    this.geoService = gs;

    this.userList = this.geoService.users;
    console.log(this.userList.size);

    // const users = res.content as Array<User>;
    // users.forEach(user => {
    //   this.userList.set(user.email.toString(), user);
    // });
  }
}
