import { AuthService } from 'src/app/api/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

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

export interface EmailCategoryResponse {
    isExecuted: boolean;
    data: EmailCategoryData;
    message: string;
}

export interface EmailCategoryData {
        official:{
            _id: string;
            category: string;
            count: number
        }[];
        own:{
            _id: string,
            category: string,
            count: number
        }[];
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
      return this.http.get( environment.baseApiURI + 'contacts/official/email', {
          headers: { accessToken : this.auth.token }
      });
  }

    getCustomerGroups() {
        return this.http.get( environment.baseApiURI + 'contacts/own/email', {
            headers: { accessToken: this.auth.token }
        });
    }

    getEmailCategory() : Observable<EmailCategoryResponse> {
        return this.http.get( environment.baseApiURI + 'email/getemailcategory/', {
            headers: { accessToken: this.auth.token }
        }) as Observable<EmailCategoryResponse>;
    }

}