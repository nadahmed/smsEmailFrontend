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
}
export interface OfficialSMSGroupResponse {
    isExecuted: boolean;
    data: OfficialSMSGroupdata[];
    message: string;
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

    getCustomerGroups(): Observable<OfficialSMSGroupResponse> {
        return this.http.get('https://bigdigi.herokuapp.com/contacts/own/cell', {
            headers: { accessToken: this.auth.token }
        }) as Observable<OfficialSMSGroupResponse>;
    }

    getOfficialGroups(){
        return this.http.get('https://bigdigi.herokuapp.com/contacts/all/cell', {
            headers: { accessToken: this.auth.token }
        });
    }

    addOwnContacts(data: GroupAddBody) {
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
}
