export interface ITransaction
{
    transactionId: string;
    date: string;
    amount: number;
    time: string;
    type?: string;
    description: string;
    receiverName?: string;
    receiverSTK?: string;
    receiverBankName?: string;
    receiverBankLogo?: string;
    senderName?: string;
    senderSTK?: string;
    senderBankName?: string;
    senderBankLogo?: string;
}

export interface IBankingTransaction
{
    id: string;
    STK: string;
    deeplink: string;
    name: string;
    logoBanking: string;
    bankName: string;
    bankbin: string;
    balance?: number;
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


export interface BankInfo
{
    bankName?: string;
    bankLogo?: string;
    bin?: string;
    accountName?: string;
    accountNumber?: string;
    amount?: number;
    content?: string;
    time?: string;
}

