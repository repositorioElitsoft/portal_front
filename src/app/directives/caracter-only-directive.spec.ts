import { CaracterOnlyDirective } from './caracter-only-directive';

describe('CaracterOnlyDirective', () => {
  it('should create an instance', () => {

    type ElementRef<T> = T;
    const myVariable: ElementRef<any> = "This can be of any type";

    const directive = new CaracterOnlyDirective(myVariable);
    expect(directive).toBeTruthy();
  });
});
