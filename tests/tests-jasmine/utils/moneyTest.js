import { formatCurrency } from '../../../scripts/utils/money.js';


describe('Test suite: formatCurrency',() => {
  it('covert cents to dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95'); // ✅ Correct

  });
  it('test with zero', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });
  it('round to nearest cents', () =>{
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
});