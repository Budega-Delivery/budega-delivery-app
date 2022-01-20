export interface Item {
    amount: number;
    productId: string;
}

export interface Order {
    addressId: string;
    itemsList: Item[];
    paymentMode: string;
    state: string;
    timeLine: [];
    userId: string;
    _id: string;
}
/*
addressId: ""
itemsList: [{amount: 5, productId: "61a455437a5273aa231200ab"},…]
paymentMode: "MONEY"
state: "ORDER"
timeline: [{date: "2021-12-07T06:10:27.721Z", userId: "04024338-fd8b-42ee-917c-c992b2366979", state: "ORDER"}]
userId: "04024338-fd8b-42ee-917c-c992b2366979"
_id: "61aefad3218f5296e3817a00"
*/