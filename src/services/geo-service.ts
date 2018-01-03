import { inject } from "aurelia-framework";
import Fixtures from "./fixtures";
import AsyncHttpClient from "./async-http-client";

import { EventAggregator } from "aurelia-event-aggregator";
import {LoginStatus, Users, GetUser, CurrUserFollowees} from "./messages";
import {Cache, Following, MessagePost, User} from "./models";
import { MessagePosts, Caches, CurrUserFollowers } from "./messages";

@inject(Fixtures, EventAggregator, AsyncHttpClient)
export class GeoService {
  ea: EventAggregator;
  ac: AsyncHttpClient;
  users: Map<string, User> = new Map();
  currUser: User;
  currUserFollowers: Array<User>;
  currUserFollowees: Array<User>;
  foundUser: User;
  caches: Array<Cache> = [];
  messagePosts: Array<MessagePost> = [];

  constructor(data: Fixtures, ea: EventAggregator, ac: AsyncHttpClient) {
    this.ea = ea;
    this.ac = ac;
  }

  getLoggedUser() {
    this.ac.get("/api/users/current").then(res => {
      const content: User = res.content as User;
      this.currUser = content;
      this.foundUser = content;
      this.getFollowers(content._id);
      this.getFollowees(content._id);
      console.log("got logged uer: " + this.currUser.firstName);
      this.ea.publish(new GetUser(this.currUser));
    });
  }

  getUser(id: string){
    this.ac.get("/api/users/" + id).then(res => {
      this.foundUser = res.content as User;
      this.getFollowers(id);
      this.getFollowees(id);
      console.log("User found: " + this.foundUser.firstName);
      this.ea.publish(new GetUser(this.foundUser));
    });
  }

  getFollowers(id: string){
    this.ac.get("/api/following/followers/" + id).then(res => {
      this.currUserFollowers = res.content as Array<User>;
      console.log("got user followers");
      this.ea.publish(new CurrUserFollowers(this.currUserFollowers));
    })
  }

  getFollowees(id: string){
    this.ac.get("/api/following/followees/" + id).then(res => {
      this.currUserFollowees = res.content as Array<User>;
      console.log("got user followers");
      this.ea.publish(new CurrUserFollowees(this.currUserFollowees));
    })
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

  addFollower(followeeId: string){
    const following = {
      follower: this.currUser._id,
      followee: followeeId
    };

    this.ac.post("/api/following", following)
      .then( res => {
        this.currUserFollowers.push(res.content);
        console.log("follower added");
        this.ea.publish(new CurrUserFollowers(this.currUserFollowers));
      })
      .catch(err => {
        console.log(err);
      });
  }

  addMessagePost(newMessage: string) {
    const newMessagePost = {
      message: newMessage
    };

    this.ac
      .post("/api/messages", newMessagePost)
      .then(res => {
        this.messagePosts.unshift(res.content);
        console.log("Message successfully posted");

        this.ea.publish(new MessagePosts(this.messagePosts));
      })
      .catch(err => {
        console.log(err);
      });
  }

  addCache(
    newName: string,
    newLocation: string,
    newLat: Number,
    newLong: Number,
    newDesc: string
  ) {
    const newCache = {
      name: newName,
      location: newLocation,
      latitude: newLat,
      longitude: newLong,
      description: newDesc
    };

    this.ac
      .post("/api/caches", newCache)
      .then(res => {
        this.caches.unshift(res.content);
        console.log(`${newName} added successfully`);
        this.ea.publish(new Caches(this.caches));
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
      img:
        "http://res.cloudinary.com/ngrant/image/upload/v1513088924/white-pin-green-back_iy4fax.png",
      admin: false
    };

    this.ac
      .post("/api/users", newUser)
      .then(res => {
        this.users.set(res.content.email.toString(), res.content);
        this.ea.publish(new Users(this.users));
        console.log(`${newFirstName} ${newLastName} added successfully`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  login(email: string, password: string) {
    const user = {
      email: email,
      password: password
    };
    this.ac.authenticate("/api/users/authenticate", user);
    this.getLoggedUser();
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
