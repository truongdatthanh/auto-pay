export interface INotification
{
    id: string,
    transactionId?: string,
    amount?: string,
    time?: string,
    date?: string,
    unread?: boolean,
    name?: string,
    content?: string,
    recieveCard?: string,
    type?: string,
    bankLogo?: string
}