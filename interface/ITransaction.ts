export interface ITransactionHistory
{
    id: string | undefined;
    STK: string | undefined;
    name: string | undefined;
    logoBanking: string | undefined;
    bankName: string | undefined;
    transactionHistory: {
        transactionId: string | undefined;
        date: string | undefined;
        amount: number | undefined;
        time: string | undefined;
        type: string | undefined;
        description: string | undefined;
        receiverName: string | undefined;
        receiverSTK: string | undefined;
        receiverBankName: string | undefined;
        receiverBankLogo: string | undefined;
        senderName: string | undefined;
        senderSTK: string | undefined;
        senderBankName: string | undefined;
        senderBankLogo: string | undefined
    }
}