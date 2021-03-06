import {MessagePost, User, Cache, Following} from "./models";

export class LoginStatus {
  status: boolean;
  loginMessage: string;

  constructor(status: boolean, loginMessage: string = ''){
    this.status = status;
    this.loginMessage = loginMessage;
  }
}

export class MessagePosts {
  messageList: Array<MessagePost>;

  constructor(messageList: Array<MessagePost>){
    this.messageList = messageList;
    console.log("EA MessageList published");
  }
}

export class CurrUserFollowers {
  followerList: Array<User>;

  constructor(followerList: Array<User>){
    this.followerList = followerList;
    console.log("EA followerList published");
  }
}

export class CurrUserFollowees {
  followeeList: Array<User>;

  constructor(followeeList: Array<User>){
    this.followeeList = followeeList;
    console.log("EA current user followeeList published");
  }
}

export class FoundUserFollowees {
  followeeList: Array<User>;

  constructor(followeeList: Array<User>){
    this.followeeList = followeeList;
    console.log("EA found user followeeList published");
  }
}

export class CurrentUser{
  currUser: User;

  constructor(currUser: User){
    this.currUser = currUser;
    console.log("EA CurrUser published");
  }
}

export class GetUser{
  foundUser: User;

  constructor(foundUser: User){
    this.foundUser = foundUser;
    console.log("EA viewUser published");
  }
}

export class Caches{
  cacheList: Array<Cache>;

  constructor(cacheList: Array<Cache>){
    this.cacheList = cacheList;
    console.log("EA CacheList published");
  }
}

export class FolloweeCaches{
  followeeCaches: Array<Cache>;

  constructor(followeeCaches: Array<Cache>){
    this.followeeCaches = followeeCaches;
    console.log("EA followeeCaches published");
  }
}

export class FolloweeMessages{
  followeeMessages: Array<MessagePost>;

  constructor(followeeMessages: Array<MessagePost>){
    this.followeeMessages = followeeMessages;
    console.log("EA followeeMessages published");
  }
}

export class Users {
  userMap: Map<string, User> = new Map();

  constructor(userMap: Map<string, User>){
    const users = userMap;
    users.forEach(user => {
      if(!user.admin){
        this.userMap.set(user.email.toString(), user);
      }
    });
    console.log("EA Userlist published");
  }
}
