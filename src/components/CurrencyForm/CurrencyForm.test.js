import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyForm from './CurrencyForm';
import { CURRENCIES } from '../../consts';

describe('Component CurrencyForm', () => {
  const testCases = [
    { amount: '100', from: CURRENCIES.pln, to: CURRENCIES.usd },
    { amount: '20', from: CURRENCIES.usd, to: CURRENCIES.pln },
    { amount: '200', from: CURRENCIES.pln, to: CURRENCIES.usd },
    { amount: '345', from: CURRENCIES.usd, to: CURRENCIES.pln },
  ];
  it('should render without crashing', () => {
    render(<CurrencyForm action={() => { }} />);
  });
  for (const testObj of testCases) {
    it('should run action callback with proper data on form submit', () => {
      const action = jest.fn();

      // render component
      render(<CurrencyForm action={action} />);

      // find “convert” button
      const submitButton = screen.getByText('Convert');

      // find fields elems
      const amountField = screen.getByTestId('amount');
      const fromField = screen.getByTestId('from-select');
      const toField = screen.getByTestId('to-select');

      // set test values to fields
      userEvent.type(amountField, testObj.amount);
      userEvent.selectOptions(fromField, testObj.from);
      userEvent.selectOptions(toField, testObj.to);

      // simulate user click on "convert" button
      userEvent.click(submitButton);

      // check if action callback was called once and with proper argument
      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith({ amount: parseInt(testObj.amount), from: testObj.from, to: testObj.to });
    })
    // unmount component
    cleanup();
  };
});