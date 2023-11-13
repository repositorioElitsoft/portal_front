import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number | string): string {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numericValue)) {
      return 'No válido'; // O el mensaje de error que desees
    }
    return numericValue.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  }
}