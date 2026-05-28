import { Pipe, PipeTransform } from '@angular/core';

type WeatherUnit = 'temperature' | 'wind' | 'degrees';

@Pipe({
  name: 'weatherUnit',
  standalone: true,
})
export class WeatherUnitPipe implements PipeTransform {
  transform(value: number | null | undefined, unit: WeatherUnit = 'temperature'): string {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return '--';
    }

    const numericValue = Number(value);

    if (unit === 'wind') {
      return `${this.format(numericValue, 1)} km/h`;
    }

    if (unit === 'degrees') {
      return `${this.format(numericValue, 0)}°`;
    }

    return `${this.format(numericValue, 1)} °C`;
  }

  private format(value: number, maximumFractionDigits: number): string {
    return new Intl.NumberFormat('pt-BR', {
      maximumFractionDigits,
      minimumFractionDigits: maximumFractionDigits,
    }).format(value);
  }
}
