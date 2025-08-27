export default function numberToWords(num: number): string {
    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    if (num === 0) return "Zero";
    let words = "";
    if (num >= 1000) {
      words += numberToWords(Math.floor(num / 1000)) + " Thousand ";
      num %= 1000;
    }
    if (num >= 100) {
      words += ones[Math.floor(num / 100)] + " Hundred ";
      num %= 100;
    }
    if (num >= 20) {
      words += tens[Math.floor(num / 10)];
      num %= 10;
      if (num > 0) words += " ";
    }
    if (num >= 10) {
      words += teens[num - 10];
      num = 0;
    }
    if (num > 0) {
      words += ones[num];
    }
    return words.trim();
  }