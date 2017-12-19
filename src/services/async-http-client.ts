import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-http-client";
import { EventAggregator } from "aurelia-event-aggregator";
import { LoginStatus } from './messages';
import { User } from './models';
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

  clearAuthentication() {
    this.http.configure(configuration => {
      configuration.withHeader('Authorization', '');
    });
  }
}
