export interface Account {
    id: number,
    name: string,
    type: string,
    balance: number,
    roi: number,
    active: boolean,
    createTimeStamp: Date,
    updateTimeStamp: Date,
}

export interface Transaction {
    id: string,
    type: string,
    description: string,
    amount: number,
    accountId: number,
    transactionTimeStamp: Date,
}

export interface FundTransfer {
    sourceAccountId: number
    targetAccountId: number
    amount: number
    description: string
    transactionTimestamp: Date
}