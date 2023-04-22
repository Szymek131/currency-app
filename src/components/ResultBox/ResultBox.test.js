import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';

describe('Component ResultBox', () => {
  const testCases = [
    { amountPLN: '100.00', expectedUSD: '28.57', amountUSD: '100.00', expectedPLN: '350.00', },
    { amountPLN: '139.00', expectedUSD: '39.71', amountUSD: '50.00', expectedPLN: '175.00', },
    { amountPLN: '64.00', expectedUSD: '18.29', amountUSD: '42.00', expectedPLN: '147.00', },
    { amountPLN: '28.00', expectedUSD: '8.00', amountUSD: '180.00', expectedPLN: '630.00', },
  ]
  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);
  });
  for (const testObj of testCases) {
    it('should render proper info about conversion when PLN -> USD', () => {
      render(<ResultBox from="PLN" to="USD" amount={parseInt(testObj.amountPLN)} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`PLN ${testObj.amountPLN} = $${testObj.expectedUSD}`);
    });
    it('should render proper info about conversion when USD -> PLN', () => {
      render(<ResultBox from="USD" to="PLN" amount={parseInt(testObj.amountUSD)} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`$${testObj.amountUSD} = PLN ${testObj.expectedPLN}`);
    });
    it('should render proper info when converting from PLN -> PLN or USD -> USD', () => {
      render(<ResultBox from="PLN" to="PLN" amount={parseInt(testObj.amountPLN)} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`PLN ${testObj.amountPLN} = PLN ${testObj.amountPLN}`);
    });
  }
  it('should render "Wrong Value" info when converting from negative value', () => {
    render(<ResultBox from="PLN" to="USD" amount={-5} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent('Wrong value');
  });
});