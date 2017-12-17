import { inject } from 'aurelia-framework';
import Fixtures from './fixtures';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Cache, MessagePost, User } from "./models";

@inject(Fixtures, EventAggregator)
export class GeoService{
  ea: EventAggregator;
  users: Map<string, User>;
  caches: Array<Cache> = [];
  messagePosts: Array<MessagePost> = [];

  constructor(data: Fixtures, ea: EventAggregator){
    this.users = data.users;
    this.caches = data.caches;
    this.messagePosts = data.messagePosts;
    this.ea = ea;
  }

  addMessage(newMessage: string, newOwner: User){
    const newMessagePost = {
      message: newMessage,
      owner: newOwner,
    };

    this.messagePosts.push(newMessagePost);
    console.log(`${newMessage} added successfully`);
  }

  addCache(newName: string, newLocation: string, newLat: Number, newLong: Number, newDesc: string){
    const newCache = {
      name: newName,
      location: newLocation,
      latitude: newLat,
      longitude: newLong,
      description: newDesc,
      owner: this.users[0],
    };

    this.caches.push(newCache);
    console.log(`${newName} added successfully`);
  }

  addUser(newFirstName, newLastName, newEmail, newPassword){
    const newUser = {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      password: newPassword,
      img: "http://res.cloudinary.com/ngrant/image/upload/v1513088924/white-pin-green-back_iy4fax.png",
      admin: false,
    };

    this.users.set(newEmail, newUser);
    console.log(`${newFirstName} ${newLastName} added successfully`);
  }
}
