import { Observable } from 'rxjs';
import { AuthService } from 'src/app/api/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { ApiResponse, BalanceData, BulkSendingRequestBody, GroupAddRequestBody } from './api-service.interface';
import { AbstractApi } from './abstract-api';

export enum Carrier {
    Email,
    Sms
}

@Injectable({
  providedIn: 'root'
})
export class SendingService extends AbstractApi {

    constructor(
        private http: HttpClient,
        private auth: AuthService,
    ) {
        super();
    }

    private setCarrier = '';

    set carrier(entry: Carrier) {
        if (entry === Carrier.Email) {
            this.setCarrier = 'email';
        } else if (entry === Carrier.Sms) {
            this.setCarrier = 'cell';
        } else {
            throw Error('Set carrier was invalid.');
        }
    }

    getCustomerGroups(): Observable<ApiResponse> {

        return this.http.get( environment.baseApiURI + 'contacts/own/' + this.setCarrier, {
            headers: { accessToken: this.auth.token }
        }) as Observable<ApiResponse>;
    }

    getOfficialGroups(): Observable<ApiResponse> {
        return this.http.get(environment.baseApiURI + 'contacts/official/' + this.setCarrier, {
            headers: { accessToken: this.auth.token }
        }) as Observable<ApiResponse>;
    }

    addOwnContact(data: GroupAddRequestBody): Observable<ApiResponse> {
        const body = {
            contacts: [data]
        };

        console.log(JSON.stringify(body));
        return this.http.post( environment.baseApiURI + 'contacts/add/' + this.setCarrier, body, {
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
        return this.http.post( environment.baseApiURI + 'contacts/add/' + this.setCarrier, body, {
            headers: { accessToken: this.auth.token },
        }) as Observable<ApiResponse>;
    }

    deleteContact(id: string, groupName: string): Observable<ApiResponse> {
        return this.http.delete(environment.baseApiURI + 'contacts/' + this.setCarrier + '/' + id + '/' + groupName, {
            headers: { accessToken: this.auth.token }
        }) as Observable<ApiResponse>;
    }

    modifyContact(id: string, groupName: string, body: {name?: string, cell?: string}): Observable<ApiResponse> {
        return this.http.post(environment.baseApiURI + 'contacts/update/' + this.setCarrier + '/' + id + '/' + groupName,
        body,
        {
            headers: { accessToken: this.auth.token }
        }
        ) as Observable<ApiResponse>;
    }

    getCategory(): Observable<ApiResponse> {
        const tempCarrier = this.setCarrier === 'cell' ? 'sms' : 'email';
        return this.http.get( environment.baseApiURI + tempCarrier + '/get' + tempCarrier + 'category/', {
            headers: { accessToken: this.auth.token }
        }) as Observable<ApiResponse>;
    }

    sendMeTestMessage(body: { message: string, subject?: string }): Observable<ApiResponse> {
        const tempCarrier = this.setCarrier === 'cell' ? 'sms' : 'email';
        return this.http.post(
            environment.baseApiURI + tempCarrier + '/sendme' + tempCarrier + '/',
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
        const tempCarrier = this.setCarrier === 'cell' ? 'sms' : 'email';
        return this.http.post(
        environment.baseApiURI + tempCarrier + '/send/',
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
