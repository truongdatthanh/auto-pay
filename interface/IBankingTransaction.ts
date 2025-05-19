export interface ITransaction
{
    transactionId: string;
    date: string;
    amount: number;
    description: string;
    senderName: string;
    senderSTK: string;
    receiverSTK: string;
}

export interface IBankingTransaction
{
    id: string;
    STK: string;
    deeplink: string;
    name: string;
    logoBanking: string;
    bankName: string;
    transactionHistory: ITransaction[];
}

export interface IBanking
{
    id: number;
    name: string;
    code: string;
    bin: string;
    shortName: string;
    logo: string;
    transferSupported: number;
    lookupSupported: number;
    short_name: string;
    support: number;
    isTransfer: number;
    swift_code: string;
}
