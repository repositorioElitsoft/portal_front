import { NumericOnlyDirective } from './numeric-only.directive';

describe('NumericOnlyDirective', () => {
  it('should create an instance', () => {
    type ElementRef<T> = T;
    const myVariable: ElementRef<any> = "This can be of any type";
    
    const directive = new NumericOnlyDirective(myVariable);
    expect(directive).toBeTruthy();
  });
});
