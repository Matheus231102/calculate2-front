export class NumberFormatUtils {
  static formatNumberToFixed(number: number, fractions: number): number {
    return Number(number.toFixed(fractions));
  }

}
