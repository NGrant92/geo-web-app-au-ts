import { inject } from "aurelia-framework";
import Fixtures from "./fixtures";
import AsyncHttpClient from "./async-http-client";

import { EventAggregator } from "aurelia-event-aggregator";
import {LoginStatus, Users, GetUser, CurrUserFollowees, FolloweeCaches, FolloweeMessages} from "./messages";
import { Cache, MessagePost, User } from "./models";
import {
  MessagePosts,
  Caches,
  CurrUserFollowers,
  FoundUserFollowees
} from "./messages";

@inject(Fixtures, EventAggregator, AsyncHttpClient)
export class GeoService {
  ea: EventAggregator;
  ac: AsyncHttpClient;
  users: Map<string, User> = new Map();
  currUser: User;
  //list of users followed by logged in user
  currUserFollowees: Array<User>;
  //list of users following a user
  userFollowers: Array<User>;
  foundUser: User;
  //list of users followed logged in user
  foundUserFollowees: Array<User>;
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
      this.getCurrUserFollowees();
      console.log("got logged uer: " + this.currUser.firstName);
      this.ea.publish(new GetUser(this.currUser));
    });
  }

  getUser(id: string) {
    this.ac.get("/api/users/" + id).then(res => {
      this.foundUser = res.content as User;
      this.getFollowers(id);
      this.getFollowees(id);
      console.log("User found: " + this.foundUser.firstName);
      this.ea.publish(new GetUser(this.foundUser));
    });
  }

  getFollowers(id: string) {
    this.ac.get("/api/following/followers/" + id).then(res => {
      this.userFollowers = res.content as Array<User>;
      console.log("got user followers");
      this.ea.publish(new CurrUserFollowers(this.userFollowers));
    });
  }

  getFollowees(id: string) {
    this.ac.get("/api/following/followees/" + id).then(res => {
      this.foundUserFollowees = res.content as Array<User>;
      console.log("got user followers");
      this.ea.publish(new FoundUserFollowees(this.foundUserFollowees));
    });
  }

  getCurrUserFollowees() {
    this.ac.get("/api/following/followees/" + this.currUser._id).then(res => {
      this.currUserFollowees = res.content as Array<User>;
      console.log("got user followers");
      this.ea.publish(new CurrUserFollowees(this.currUserFollowees));
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

  getFolloweeCaches() {
    this.ac.get("/api/caches/following").then(res => {
      console.log("followee caches retrieved");
      this.ea.publish(new FolloweeCaches(res.content));
    });
  }

  getFolloweeMessages() {
    this.ac.get("/api/messages/following").then(res => {
      console.log("followee messages retrieved");
      this.ea.publish(new FolloweeMessages(res.content));
    });
  }

  getMessagePosts() {
    this.ac.get("/api/messages").then(res => {
      this.messagePosts = res.content;
      console.log("messages retrieved");
      this.ea.publish(new MessagePosts(this.messagePosts));
    });
  }

  addFollower(followeeId: string) {
    const following = {
      follower: this.currUser._id,
      followee: followeeId
    };

    this.ac
      .post("/api/following", following)
      .then(res => {
        this.userFollowers.push(res.content.follower);
        console.log("follower added");
        this.ea.publish(new CurrUserFollowers(this.userFollowers));

        this.currUserFollowees.push(res.content.followee);
        this.ea.publish(new CurrUserFollowees(this.currUserFollowees));
      })
      .catch(err => {
        console.log(err);
      });

    this.getFolloweeCaches();
  }

  removeFollower(followeeId: string) {
    this.ac
      .delete("/api/following/" + followeeId)
      .then(res => {
        this.getCurrUserFollowees();
        this.getFollowers(followeeId);
        console.log("Unfollowed person");
      })
      .catch(err => {
        console.log(err);
      });

    this.getFolloweeCaches();
  }

  addMessagePost(newMessage, newImage) {
    const newMessagePost = {
      message: newMessage,
      img: newImage
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
