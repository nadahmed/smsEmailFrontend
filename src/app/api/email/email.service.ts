
import { AuthService } from 'src/app/api/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiResponse, BalanceData, BulkSendingRequestBody, GroupAddRequestBody } from '../api-service.interface';
import { AbstractApi } from '../abstract-api';


@Injectable({
    providedIn: 'root'
})
export class EmailService extends AbstractApi {

    constructor(
        private http: HttpClient,
        private auth: AuthService,
    ) {
        super();
    }

    getOfficialGroups(): Observable<ApiResponse> {
        return this.http.get(environment.baseApiURI + 'contacts/official/email', {
            headers: { accessToken: this.auth.token }
        }) as Observable<ApiResponse>;
    }

    getCustomerGroups(): Observable<ApiResponse> {
        return this.http.get(environment.baseApiURI + 'contacts/own/email', {
            headers: { accessToken: this.auth.token }
        }) as Observable<ApiResponse>;
    }

    getCategory(): Observable<ApiResponse> {
        return this.http.get(environment.baseApiURI + 'email/getemailcategory/', {
            headers: { accessToken: this.auth.token }
        }) as Observable<ApiResponse>;
    }

    addOwnContact(data: GroupAddRequestBody): Observable<ApiResponse> {
        const body = {
            contacts: [{
                ...data
            }]
        };

        console.log(JSON.stringify(body));
        return this.http.post(environment.baseApiURI + 'contacts/add/email', body, {
            headers: { accessToken: this.auth.token },
        }) as Observable<ApiResponse>;
    }

    addOwnContacts(data: GroupAddRequestBody[]): Observable<ApiResponse> {
        const body = {
            contacts: []
        };
        data.forEach(res => {
            body.contacts.push({
                ...res,
                createdBy: this.auth.user.id
            });
        });
        return this.http.post(environment.baseApiURI + 'contacts/add/email', body, {
            headers: { accessToken: this.auth.token },
        }) as Observable<ApiResponse>;
    }

    deleteContact(id: string, groupName: string): Observable<ApiResponse> {
        return this.http.delete(environment.baseApiURI + 'contacts/email/' + id + '/' + groupName, {
            headers: { accessToken: this.auth.token }
        }) as Observable<ApiResponse>;
    }

    modifyContact(id: string, groupName: string, body: { name?: string, email?: string; }): Observable<ApiResponse> {
        return this.http.post(environment.baseApiURI + 'contacts/update/email/' + id + '/' + groupName,
            body,
            {
                headers: { accessToken: this.auth.token }
            }
        ) as Observable<ApiResponse>;
    }

    sendMeTestMessage(body: {subject: string, message: string}): Observable<ApiResponse> {
        return this.http.post(
            environment.baseApiURI + 'email/sendmeemail/',
            body,
            {
                headers: { accessToken: this.auth.token }
            }).pipe(
                tap((res: ApiResponse) => {
                    if (res.isExecuted) {
                        this.auth.balance = (res.data as BalanceData).balance;
                    }
                })
            ) as Observable<ApiResponse>;
    }

    sendBulkMessage(body: BulkSendingRequestBody) {
        return this.http.post(
            environment.baseApiURI + 'email/send/',
            body,
            {
                headers: { accessToken: this.auth.token }
            }
        ).pipe(
            tap((res: ApiResponse) => {
                if (res.isExecuted) {
                    this.auth.balance = (res.data as BalanceData).balance;
                }
            })
        ) as Observable<ApiResponse>;
    }

}
