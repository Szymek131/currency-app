import { convertPLNToUSD } from './../convertPLNtoUSD';

describe('convertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });
  it('should return NaN when input is text', () => {
    expect(convertPLNToUSD('1')).toBeNaN();
    expect(convertPLNToUSD('asd')).toBeNaN();
    expect(convertPLNToUSD('-123asczx')).toBeNaN();
  });
  it('should return NaN when input is empty', () => {
    expect(convertPLNToUSD()).toBeNaN();
  });
  it('should return "Error" when input is not string or number', () => {
    expect(convertPLNToUSD([])).toBe('Error');
    expect(convertPLNToUSD({})).toBe('Error');
    expect(convertPLNToUSD(null)).toBe('Error');
    expect(convertPLNToUSD(function () { })).toBe('Error');
  });
  it('should return $0.00 when input is less than 0', () => {
    expect(convertPLNToUSD(-1)).toBe('$0.00');
    expect(convertPLNToUSD(-6)).toBe('$0.00');
    expect(convertPLNToUSD(-1234)).toBe('$0.00');
  });
});