import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'translateMonth'
})
export class TranslateMonthPipe implements PipeTransform {
  transform(value: string): string {
    const monthTranslations: { [key: string]: string } = {
      'January': 'Januar',
      'February': 'Februar',
      'March': 'Mart',
      'April': 'April',
      'May': 'Maj',
      'June': 'Jun',
      'July': 'Jul',
      'August': 'Avgust',
      'September': 'Septembar',
      'October': 'Oktobar',
      'November': 'Novembar',
      'December': 'Decembar'
    };

    const [day, month] = value.split(' ');
    const translatedMonth = monthTranslations[month];

    return `${day} ${translatedMonth}`;
  }
}
