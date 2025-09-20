"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = formatDate;
function formatDate(date) {
    if (date == null || date === '-') {
        return date; // Return the original value if it's null or '-'
    }
    // If date is a string, create a new Date object from it
    const formattedDate = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(formattedDate.getTime())) {
        return 'Invalid Date';
    }
    // Get day, month, and year components
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = formattedDate.getFullYear();
    // Return the formatted date
    return `${day}-${month}-${year}`;
}
