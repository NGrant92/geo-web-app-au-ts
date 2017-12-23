import {MessagePost} from "./models";

export class LoginStatus {
  status: boolean;
  loginMessage: string;

  constructor(status: boolean, loginMessage: string = ''){
    this.status = status;
    this.loginMessage = loginMessage;
  }
}

export class UserMessagePosts {
  messageList: Array<MessagePost>;

  constructor(messageList: Array<MessagePost>){
    this.messageList = messageList
  }
}
