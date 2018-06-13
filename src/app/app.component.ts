import { Component } from '@angular/core';
import { FacebookService } from './facebook.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(facebook: FacebookService, http: HttpClient) {
    facebook.login().subscribe((response) => {
      http.post('http://app.dev/facebook', response).subscribe();
    })
  }
}
