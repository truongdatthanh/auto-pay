export interface ITransactionHistory
{
    id: string | undefined;
    STK: string | undefined;
    name: string | undefined;
    logoBanking: string | undefined;
    bankName: string | undefined;
    transactionHistory: {
        date: string;
        amount: number;
        description: string;
    }[];
}