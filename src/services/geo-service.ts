import { inject } from 'aurelia-framework';
import Fixtures from './fixtures';
import AsyncHttpClient from './async-http-client';

import { EventAggregator } from 'aurelia-event-aggregator';
import { LoginStatus } from './messages';
import { Cache, MessagePost, User } from "./models";

@inject(Fixtures, EventAggregator, AsyncHttpClient)
export class GeoService{
  ea: EventAggregator;
  ac: AsyncHttpClient;
  users: Map<string, User>;
  caches: Array<Cache> = [];
  messagePosts: Array<MessagePost> = [];

  constructor(data: Fixtures, ea: EventAggregator, ac: AsyncHttpClient){
    this.ea = ea;
    this.ac = ac;
    this.getUsers();
    // this.getCaches();
    // this.getMessagePosts();
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

  login(email: string, password: string){
    const loginStatus = new LoginStatus(false);
    const user = this.users.get(email);

    if (user){
      if (user.password === password){
        loginStatus.status = true;
        loginStatus.loginMessage = 'logged in';
      }
      else {
        loginStatus.loginMessage = 'Incorrect Password';
      }
    }
    else {
      loginStatus.loginMessage = 'Unregistered email';
    }
    this.ea.publish(loginStatus);
    console.log(`User logged in`);
  }

  logout(){
    this.ea.publish(new LoginStatus(false));
    console.log(`User logged out`);
  }
}
