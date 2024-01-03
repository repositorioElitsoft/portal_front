import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[appCaracterOnly]'
})
export class CaracterOnlyDirective {
  constructor(private el: ElementRef) {}
  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const value = inputElement.value;
    inputElement.value = value.replace(/[^a-zA-Z]/g, '');
  }
}