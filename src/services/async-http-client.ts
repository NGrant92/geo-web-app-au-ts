import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-http-client";
import { EventAggregator } from "aurelia-event-aggregator";
import { LoginStatus } from './messages';
import Fixtures from "./fixtures";

@inject(HttpClient, Fixtures, EventAggregator)
export default class AsyncHttpClient {
  http: HttpClient;
  ea: EventAggregator;

  constructor(httpClient, fixtures, ea) {
    this.http = httpClient;
    this.http.configure(http => {
      http.withBaseUrl(fixtures.baseUrl);
    });
    this.ea = ea;
  }

  get(url) {
    return this.http.get(url);
  }

  post(url, obj) {
    return this.http.post(url, obj);
  }

  delete(url) {
    return this.http.delete(url);
  }

  authenticate(url: string, credentials: {email:string, password:string}) {
    this.http
      .post(url, credentials)
      .then(response => {
        const status = response.content;
        if (status.success) {
          localStorage.geo = JSON.stringify(response.content);
          this.http.configure(configuration => {
            configuration.withHeader(
              'Authorization',
              'bearer ' + response.content.token,
            );
          });
        }
        this.ea.publish(new LoginStatus(true));
      })
      .catch(error => {
        this.ea.publish(new LoginStatus(false, 'service not available'));
      });
  }

  isAuthenticated() {
    let authenticated = false;
    if (localStorage.geo !== 'null') {
      authenticated = true;
      this.http.configure(http => {
        const auth = JSON.parse(localStorage.geo);
        http.withHeader('Authorization', 'bearer ' + auth.token);
      });
    }
    return authenticated;
  }

  clearAuthentication() {
    localStorage.geo = null;
    this.http.configure(configuration => {
      configuration.withHeader('Authorization', '');
    });
  }
}
