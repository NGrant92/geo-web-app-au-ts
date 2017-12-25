import { inject } from "aurelia-framework";
import Fixtures from "./fixtures";
import AsyncHttpClient from "./async-http-client";

import { EventAggregator } from "aurelia-event-aggregator";
import {LoginStatus, Users} from "./messages";
import { Cache, MessagePost, User } from "./models";
import { CurrentUser, MessagePosts, Caches } from "./messages";

@inject(Fixtures, EventAggregator, AsyncHttpClient)
export class GeoService {
  ea: EventAggregator;
  ac: AsyncHttpClient;
  users: Map<string, User> = new Map();
  currUser: User;
  caches: Array<Cache> = [];
  messagePosts: Array<MessagePost> = [];

  constructor(data: Fixtures, ea: EventAggregator, ac: AsyncHttpClient) {
    this.ea = ea;
    this.ac = ac;

    // if(this.isAuthenticated()){
    //   this.getLoggedUser();
    //   this.getMessagePosts();
    //   this.getCaches();
    //   this.getUsers();
    // }
  }

  getLoggedUser(){
      this.ac.get("/api/users/current").then(res => {
        this.currUser = res.content as User;
        console.log("got logged uer: " + this.currUser.firstName);
        this.ea.publish(new CurrentUser(this.currUser));
      });
  }

  getUsers() {
    this.ac.get("/api/users").then(res => {
      const users = res.content as Array<User>;
      users.forEach(user => {
        this.users.set(user.email.toString(), user);
      });

      this.ea.publish(new Users(this.users));
    });
  }

  getCaches() {
    this.ac.get("/api/caches").then(res => {
      this.caches = res.content;
      console.log("caches retrieved");
      this.ea.publish(new Caches(this.caches));
    });
  }

  getMessagePosts() {
    this.ac.get("/api/messages").then(res => {
      this.messagePosts = res.content;
      console.log("messages retrieved");
      this.ea.publish(new MessagePosts(this.messagePosts));
    });
  }

  addMessagePost(newMessage: string) {
    const newMessagePost = {
      message: newMessage
    };

    this.ac
      .post("/api/messages", newMessagePost)
      .then(res => {
        this.caches.push(res.content);
        console.log("Message successfully posted");
      })
      .catch(err => {
        console.log(err);
      });
  }

  addCache(newName: string, newLocation: string, newLat: Number, newLong: Number, newDesc: string) {
    const newCache = {
      name: newName,
      location: newLocation,
      latitude: newLat,
      longitude: newLong,
      description: newDesc,
    };

    this.ac
      .post("/api/caches", newCache)
      .then(res => {
        this.caches.push(res.content);
        console.log(`${newName} added successfully`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  addUser(newFirstName, newLastName, newEmail, newPassword) {
    const newUser = {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      password: newPassword,
      img: "http://res.cloudinary.com/ngrant/image/upload/v1513088924/white-pin-green-back_iy4fax.png",
      admin: false
    };

    this.ac
      .post('/api/users', newUser)
      .then(res => {
        this.getUsers();
        console.log(`${newFirstName} ${newLastName} added successfully`);
      })
      .catch(err => {
        console.log(err);
      })
  }

  login(email: string, password: string) {
    const user = {
      email: email,
      password: password,
    };
    this.ac.authenticate('/api/users/authenticate', user);
    this.getLoggedUser();
    console.log(`User logged in`);
  }

  isAuthenticated() {
    const isAuth = this.ac.isAuthenticated();
    // if(isAuth){
    //   this.getLoggedUser();
    // }
    return isAuth;
  }

  logout() {
    this.ac.clearAuthentication();
    this.ea.publish(new LoginStatus(false));
    console.log(`User logged out`);
  }
}
