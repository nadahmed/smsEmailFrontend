
export interface ApiResponse {
    isExecuted: boolean;
    data: GroupData | CategoryData | BalanceData;
    message: string;
}

export interface GroupData {
    id?: string;
    cell?: GroupDataDetails[];
    email?: GroupDataDetails[];
}

export interface GroupDataDetails {
    _id: string;
    groupName: string;
    contacts: {
        createdAt: Date,
        updatedAt: Date,
        isDisabled: boolean,
        _id: string,
        location: string,
        name: string,
        cell?: string
        email?: string
    }[];
}

export interface CategoryData {
        official: {
            _id: string;
            category: string;
            count: number
        }[];
        own: {
            _id: string,
            category: string,
            count: number
        }[];
}

export interface GroupAddRequestBody {
    profession: string;
    name: string;
    email?: string;
    cell?: string;
    // createdBy:userId
}

export interface BalanceData {
    balance: number;
}

export interface BulkSendingRequestBody {
  groups: {
    type: string;
    category: string;
    qty: number;
  }[];
  message: string;
  subject?: string;
  bill?: string;
}
