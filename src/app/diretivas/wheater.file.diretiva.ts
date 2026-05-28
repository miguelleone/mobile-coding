import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appCartaoClima]',
  standalone: true,
})
export class CartaoClimaDirective implements OnChanges {
  
  @Input('appCartaoClima') temperatura: number = 0;

  constructor(private elemento: ElementRef) {}

  ngOnChanges(): void {
    this.aplicarCor();
  }

  private aplicarCor(): void {
    const temp = this.temperatura;
    let cor: string;

    if (temp < 10) {
      cor = '#bbdefb'; 
    } else if (temp < 25) {
      cor = '#c8e6c9'; 
    } else {
      cor = '#ffe0b2'; 
    }

    this.elemento.nativeElement.style.backgroundColor = cor;
    this.elemento.nativeElement.style.transition = 'background-color 0.4s ease';
  }
}