import { Observable } from 'rxjs';
import { AuthService } from 'src/app/api/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { ApiResponse, BalanceData, BulkSendingRequestBody, GroupAddRequestBody } from '../api-service.interface';
import { AbstractApi } from '../abstract-api';



@Injectable({
    providedIn: 'root'
})
export class SmsService extends AbstractApi {

    constructor(
        private http: HttpClient,
        private auth: AuthService,
    ) {
        super();
    }

    getCustomerGroups(): Observable<ApiResponse> {
        return this.http.get( environment.baseApiURI + 'contacts/own/cell', {
            headers: { accessToken: this.auth.token }
        }) as Observable<ApiResponse>;
    }

    getOfficialGroups(): Observable<ApiResponse> {
        return this.http.get(environment.baseApiURI + 'contacts/official/cell', {
            headers: { accessToken: this.auth.token }
        }) as Observable<ApiResponse>;
    }

    addOwnContact(data: GroupAddRequestBody): Observable<ApiResponse> {
        const body = {
            contacts: [data]
        };

        console.log(JSON.stringify(body));
        return this.http.post( environment.baseApiURI + 'contacts/add/cell', body, {
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
        return this.http.post( environment.baseApiURI + 'contacts/add/cell', body, {
            headers: { accessToken: this.auth.token },
        }) as Observable<ApiResponse>;
    }

    deleteContact(id: string, groupName: string): Observable<ApiResponse> {
        return this.http.delete(environment.baseApiURI + 'contacts/cell/' + id + '/' + groupName, {
            headers: { accessToken: this.auth.token }
        }) as Observable<ApiResponse>;
    }

    modifyContact(id: string, groupName: string, body: {name?: string, cell?: string}): Observable<ApiResponse> {
        return this.http.post(environment.baseApiURI + 'contacts/update/cell/' + id + '/' + groupName,
        body,
        {
            headers: { accessToken: this.auth.token }
        }
        ) as Observable<ApiResponse>;
    }

    getCategory(): Observable<ApiResponse> {
        return this.http.get( environment.baseApiURI + 'sms/getsmscategory/', {
            headers: { accessToken: this.auth.token }
        }) as Observable<ApiResponse>;
    }

    sendMeTestMessage(body: { message: string }): Observable<ApiResponse> {
        return this.http.post(
            environment.baseApiURI + 'sms/sendmesms/',
            body,
            {
            headers: { accessToken: this.auth.token }
        }).pipe(
          tap( (res: ApiResponse) => {
            if (res.isExecuted) {
              this.auth.balance = (res.data as BalanceData).balance;
            }
          })
        ) as Observable<ApiResponse>;
    }

    sendBulkMessage(data: BulkSendingRequestBody) {
      return this.http.post(
        environment.baseApiURI + 'sms/send/',
        { ...data },
        {
          headers: { accessToken: this.auth.token }
        }
      ).pipe(
        tap( (res: ApiResponse) => {
          if (res.isExecuted) {
            this.auth.balance = (res.data as BalanceData).balance;
          }
        })
      ) as Observable<ApiResponse>;
    }

}
