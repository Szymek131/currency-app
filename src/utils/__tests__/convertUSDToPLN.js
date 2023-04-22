import { convertUSDToPLN } from './../convertUSDToPLN';

describe('convertUSDToPLN', () => {
  it('should return proper value when good input', () => {
    expect(convertUSDToPLN(1)).toBe('PLN 3.50');
    expect(convertUSDToPLN(2)).toBe('PLN 7.00');
    expect(convertUSDToPLN(20)).toBe('PLN 70.00');
    expect(convertUSDToPLN(12)).toBe('PLN 42.00');
  });
  it('should return NaN when input is text', () => {
    expect(convertUSDToPLN('1')).toBeNaN();
    expect(convertUSDToPLN('asd')).toBeNaN();
    expect(convertUSDToPLN('-123asczx')).toBeNaN();
  });
  it('should return NaN when input is empty', () => {
    expect(convertUSDToPLN()).toBeNaN();
  });
  it('should return "Error" when input is not string or number', () => {
    expect(convertUSDToPLN([])).toBe('Error');
    expect(convertUSDToPLN({})).toBe('Error');
    expect(convertUSDToPLN(null)).toBe('Error');
    expect(convertUSDToPLN(function () { })).toBe('Error');
  });
  it('should return PLN 0.00 when input is less than 0', () => {
    expect(convertUSDToPLN(-1)).toBe('PLN 0.00');
    expect(convertUSDToPLN(-6)).toBe('PLN 0.00');
    expect(convertUSDToPLN(-1234)).toBe('PLN 0.00');
  });
});