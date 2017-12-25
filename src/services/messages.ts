import {MessagePost, User} from "./models";

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
    this.messageList = messageList
  }
}

export class CurrentUser{
  currUser: User;

  constructor(currUser: User){
    this.currUser = currUser;
    console.log("EA CurrUser published");
  }
}
