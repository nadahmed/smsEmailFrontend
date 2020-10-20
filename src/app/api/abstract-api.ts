import { Observable } from 'rxjs';
import { ApiResponse, BulkSendingRequestBody, GroupAddRequestBody } from './api-service.interface';

export abstract class AbstractApi {
    abstract getCustomerGroups(): Observable<ApiResponse>;

    abstract getOfficialGroups(): Observable<ApiResponse>;

    abstract addOwnContact(data: GroupAddRequestBody): Observable<ApiResponse>;

    abstract addOwnContacts(data: GroupAddRequestBody[]): Observable<ApiResponse>;

    abstract deleteContact(id: string, groupName: string): Observable<ApiResponse>;

    abstract modifyContact(id: string, groupName: string, body: {name?: string, cell?: string});

    abstract getCategory(): Observable<ApiResponse>;

    abstract sendMeTestMessage(data: {message: string, subject?: string}): Observable<ApiResponse>;
    
    abstract sendBulkMessage(data: BulkSendingRequestBody): Observable<ApiResponse>;
}
