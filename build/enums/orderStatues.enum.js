"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatuesArray = exports.OrderStatues = void 0;
var OrderStatues;
(function (OrderStatues) {
    OrderStatues[OrderStatues["Pending"] = 10] = "Pending";
    OrderStatues[OrderStatues["Processing"] = 20] = "Processing";
    OrderStatues[OrderStatues["Complete"] = 30] = "Complete";
    OrderStatues[OrderStatues["Cancel"] = 40] = "Cancel";
})(OrderStatues || (exports.OrderStatues = OrderStatues = {}));
exports.OrderStatuesArray = [
    { id: OrderStatues.Pending, text: "Pending" },
    { id: OrderStatues.Processing, text: "Processing" },
    { id: OrderStatues.Complete, text: "Complete" },
    { id: OrderStatues.Cancel, text: "Cancel" },
];
