import React from 'react';
import { map } from 'ramda';
import PropTypes from 'prop-types';

const Panel = ({
  coins,
  products,
  onPay,
  onChoose,
  onRemove,
  onReturnCoin
}) => {
  const coinsButtons = map(value => (
     <button key={value} onClick={onPay(value)}>
       Insert {value}
     </button>
  ), coins);

  const availableProducts = map(product => (
     <button key={product.id} onClick={onChoose(product)}>
       {product.name}
     </button>
  ), products);

  return (
    <React.Fragment>
      <section className='coins'>{coinsButtons}</section>
      <section className='products'>{availableProducts}</section>

      <section className='take'>
        <button onClick={onRemove}>Remove Product</button>
      </section>

      <section className='coin-return'>
        <button onClick={onReturnCoin}>Coin Return</button>
      </section>
    </React.Fragment>
  )
}

Panel.propTypes = {
  coins: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  onPay: PropTypes.func.isRequired,
  onChoose: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onReturnCoin: PropTypes.func.isRequired
}

export default Panel;
