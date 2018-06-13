import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  private sdk: any = null;

  private params: any = {
    appId: '446181002494298',
    cookie: true,
    xfbml: true,
    version: 'v2.8',
  }

  constructor() {}  

  login(): Observable<any> {
    return from(this.init().then(() => {
      return new Promise((resolve, reject) => {
        this.sdk.login((response) => {
          if (response.authResponse) {
            // resolve(response.authResponse);
            this.sdk.api('/me', (response) => {
              resolve(response);
            });
          } else {
            reject(response);
          }
        });
      })
    }));
  }

  private init(): Promise<any> {
    return new Promise((resolve) => {
      ((window: any) => {
        if (this.sdk) {
          resolve(this.sdk);
          
          return;
        }

        window.fbAsyncInit = () => {
          this.sdk = window.FB;
          this.sdk.init(this.params);

          resolve(this.sdk);
        }

        (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/zh_TW/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

      })(window);
    });
  }  
}
