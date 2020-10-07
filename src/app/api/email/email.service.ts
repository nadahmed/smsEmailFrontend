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
// export interface OfficialEmailGroupResponse {
//     isExecuted: boolean;
//     data: OfficialEmailGroupdata[];
//     message: string;
// }

export interface EmailResponse {
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

export interface GroupAddBody {
    profession: string;
    name: string;
    email: string;
    // createdBy:userId
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

  getCustomerGroups(): Observable<EmailResponse> {
    return this.http.get( environment.baseApiURI + 'contacts/own/email', {
        headers: { accessToken: this.auth.token }
    }) as Observable<EmailResponse>;
}

    getEmailCategory() : Observable<EmailCategoryResponse> {
        return this.http.get( environment.baseApiURI + 'email/getemailcategory/', {
            headers: { accessToken: this.auth.token }
        }) as Observable<EmailCategoryResponse>;
    }

    addOwnContact(data: GroupAddBody) {
        const body = {
            contacts: [{
                ...data,
                createdBy: this.auth.user.id
            }]
        };

        console.log(JSON.stringify(body));
        return this.http.post( environment.baseApiURI + 'contacts/add/email', body, {
            headers: { accessToken: this.auth.token },
        });
    }

    addOwnContacts(data: GroupAddBody[]) {
        const body = {
            contacts: []
        };
        data.forEach(res => {
            body.contacts.push({
                ...res,
                createdBy: this.auth.user.id
            });
        });
        return this.http.post( environment.baseApiURI + 'contacts/add/email', body, {
            headers: { accessToken: this.auth.token },
        });
    }

}