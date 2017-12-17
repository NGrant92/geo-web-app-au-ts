export class LoginStatus {
  status: boolean;
  loginMessage: string;

  constructor(status: boolean, loginMessage: string = ''){
    this.status = status;
    this.loginMessage = loginMessage;
  }
}
