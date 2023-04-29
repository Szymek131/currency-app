import PropTypes from 'prop-types';
import { convertUSDToPLN } from './../../utils/convertUSDToPLN';
import { convertPLNToUSD } from './../../utils/convertPLNToUSD';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';
import { useMemo } from 'react';
import { CURRENCIES } from '../../consts';

import styles from './ResultBox.module.scss';

const ResultBox = ({ from, to, amount }) => {
  const convertedAmount = useMemo(() => {
    if (from === CURRENCIES.usd && to === CURRENCIES.pln) return convertUSDToPLN(amount);
    if (from === CURRENCIES.pln && to === CURRENCIES.usd) return convertPLNToUSD(amount);
    return formatAmountInCurrency(amount, from);
  }, [from, to, amount]);

  const formattedAmount = useMemo(() => formatAmountInCurrency(amount, from), [amount, from]);

  return (
    <div data-testid="output" className={styles.result}>
      {formattedAmount} = {convertedAmount}
    </div>
  );
};

ResultBox.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
}

export default ResultBox;