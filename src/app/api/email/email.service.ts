import { AuthService } from 'src/app/api/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface OfficialEmailGroupdata {
    professionGroup: string;
    contacts: {
        profession: string,
        name: string
    }[];
}
export interface OfficialEmailGroupResponse {
    isExecuted: boolean;
    data: OfficialEmailGroupdata[];
    message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
      private http: HttpClient,
      private auth: AuthService,
      ) { }

  getOfficialGroups() {
      return this.http.get('https://bigdigi.herokuapp.com/contacts/official/email', {
          headers: { accessToken : this.auth.token }
      });
  }

  getCustomerGroups() {
    return this.http.get('https://bigdigi.herokuapp.com/contacts/own/email', {
        headers: { accessToken: this.auth.token }
    });
}

}