export enum OrderStatues {
    Pending = 10,
    Processing = 20,
    Complete = 30,
    Cancel = 40,
}

export const OrderStatuesArray = [
    { id: OrderStatues.Pending, text: "Pending" },
    { id: OrderStatues.Processing, text: "Processing" },
    { id: OrderStatues.Complete, text: "Complete" },
    { id: OrderStatues.Cancel, text: "Cancel" },
]