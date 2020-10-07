import { Observable } from 'rxjs';
import { AuthService } from 'src/app/api/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface OfficialSMSGroupdata {
    professionGroup: string;
    contacts: {
        contactsId: string;
        profession: string;
        name: string;
        cell: string;
    }[];
};

export interface SMSResponse {
    isExecuted: boolean;
    data: OfficialSMSGroupdata[];
    message: string;
}

export interface TestSMSResponse {
    isExecuted: boolean;
    data: Object;
    message: string;
}

export interface SMSCategoryResponse {
    isExecuted: boolean;
    data: SMSCategoryData;
    message: string;
}

export interface SMSCategoryData {
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
    cell: string;
    // createdBy:userId
}

export interface BulkSMSRequestBody {
  groups: {
    type: string;
    category: string;
    qty: number;
  }[];
  message: string;
  bill: string;
}

@Injectable({
    providedIn: 'root'
})
export class SmsService {

    constructor(
        private http: HttpClient,
        private auth: AuthService,
    ) { }

    getCustomerGroups(): Observable<SMSResponse> {
        return this.http.get( environment.baseApiURI + 'contacts/own/cell', {
            headers: { accessToken: this.auth.token }
        }) as Observable<SMSResponse>;
    }

    getOfficialGroups() {
        return this.http.get(environment.baseApiURI + 'contacts/official/cell', {
            headers: { accessToken: this.auth.token }
        });
    }

    addOwnContact(data: GroupAddBody) {
        const body = {
            contacts: [{
                ...data,
                createdBy: this.auth.user.id
            }]
        };

        console.log(JSON.stringify(body));
        return this.http.post( environment.baseApiURI + 'contacts/add/cell', body, {
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
        return this.http.post( environment.baseApiURI + 'contacts/add/cell', body, {
            headers: { accessToken: this.auth.token },
        });
    }

    getSmsCategory() : Observable<SMSCategoryResponse> {
        return this.http.get( environment.baseApiURI + 'sms/getsmscategory/', {
            headers: { accessToken: this.auth.token }
        }) as Observable<SMSCategoryResponse>;
    }

    sendTestSms(message: string) : Observable<TestSMSResponse> {
        return this.http.post(
            environment.baseApiURI + 'sms/sendmesms/',
            { message },
            {
            headers: { accessToken: this.auth.token }
        }) as Observable<SMSCategoryResponse>;
    }

    sendBulkSMS(data: BulkSMSRequestBody){
      return this.http.post(
        environment.baseApiURI + 'sms/send/',
        { ...data },
        {
          headers: { accessToken: this.auth.token }
        }
      ) as Observable<SMSResponse>
    }

}
