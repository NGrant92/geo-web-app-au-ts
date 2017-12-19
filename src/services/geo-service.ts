import { inject } from "aurelia-framework";
import Fixtures from "./fixtures";
import AsyncHttpClient from "./async-http-client";

import { EventAggregator } from "aurelia-event-aggregator";
import { LoginStatus } from "./messages";
import { Cache, MessagePost, User } from "./models";

@inject(Fixtures, EventAggregator, AsyncHttpClient)
export class GeoService {
  ea: EventAggregator;
  ac: AsyncHttpClient;
  users: Map<string, User> = new Map();
  caches: Array<Cache> = [];
  messagePosts: Array<MessagePost> = [];

  constructor(data: Fixtures, ea: EventAggregator, ac: AsyncHttpClient) {
    this.ea = ea;
    this.ac = ac;
    // this.getUsers();
    // this.getCaches();
    // this.getMessagePosts();
  }

  getUsers() {
    this.ac.get("/api/users").then(res => {
      const users = res.content as Array<User>;
      users.forEach(user => {
        this.users.set(user.email.toString(), user);
      });
    });
  }

  getCaches() {
    this.ac.get("/api/caches").then(res => {
      this.caches = res.content;
    });
  }

  getMessagePosts() {
    this.ac.get("api/messages").then(res => {
      this.messagePosts = res.content;
    });
  }

  addMessagePost(newMessage: string, newOwner: User) {
    const newMessagePost = {
      message: newMessage,
      owner: newOwner
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
    console.log(`User logged in`);
  }

  isAuthenticated() {
    return this.ac.isAuthenticated();
  }

  logout() {
    this.ac.clearAuthentication();
    this.ea.publish(new LoginStatus(false));
    console.log(`User logged out`);
  }
}
