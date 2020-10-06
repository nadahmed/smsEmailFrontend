import { Observable } from 'rxjs';
import { AuthService } from 'src/app/api/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface OfficialSMSGroupdata {
    professionGroup: string;
    contacts: {
        contactsId: string;
        profession: string;
        name: string;
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

@Injectable({
    providedIn: 'root'
})
export class SmsService {

    constructor(
        private http: HttpClient,
        private auth: AuthService,
    ) { }

    getCustomerGroups(): Observable<SMSResponse> {
        return this.http.get('https://bigdigi.herokuapp.com/contacts/own/cell', {
            headers: { accessToken: this.auth.token }
        }) as Observable<SMSResponse>;
    }

    getOfficialGroups() {
        return this.http.get('https://bigdigi.herokuapp.com/contacts/official/cell', {
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
        return this.http.post('https://bigdigi.herokuapp.com/contacts/add/cell', body, {
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
        return this.http.post('https://bigdigi.herokuapp.com/contacts/add/cell', body, {
            headers: { accessToken: this.auth.token },
        });
    }

    getSmsCategory() : Observable<SMSCategoryResponse> {
        return this.http.get('https://bigdigi.herokuapp.com/sms/getSMScategory/', {
            headers: { accessToken: this.auth.token }
        }) as Observable<SMSCategoryResponse>;
    }

    sendTestSms(message: string) : Observable<TestSMSResponse> {
        return this.http.post(
            'http://192.168.0.103:5000/sms/sendmesms/',
            { message }, 
            {
            headers: { accessToken: this.auth.token }
        }) as Observable<SMSCategoryResponse>;
    }

}
