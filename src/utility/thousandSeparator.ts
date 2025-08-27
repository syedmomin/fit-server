export default function thousandSeparator(number: number | string): string {
    // Convert the number to a string if it's not already
    let numberString: string = typeof number === 'number' ? number.toString() : number;

    // Add thousand separators
    const regex = /\B(?=(\d{3})+(?!\d))/g;
    numberString = numberString.replace(regex, ",");

    return numberString;
}