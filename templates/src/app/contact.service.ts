import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  url = "https://api.brevo.com/v3/smtp/email";

  httpOptions = new HttpHeaders({
    "Content-Type": "application/json",

    "api-key": `api key from brevo`,
  });

  constructor(public http: HttpClient) {}

  sendEmail(msg: any): Observable<Object> {
    return this.http.post(this.url, msg, { headers: this.httpOptions });
  }
}
