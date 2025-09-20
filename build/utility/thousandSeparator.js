"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = thousandSeparator;
function thousandSeparator(number) {
    // Convert the number to a string if it's not already
    let numberString = typeof number === 'number' ? number.toString() : number;
    // Add thousand separators
    const regex = /\B(?=(\d{3})+(?!\d))/g;
    numberString = numberString.replace(regex, ",");
    return numberString;
}
