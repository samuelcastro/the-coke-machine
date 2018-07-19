import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Display, Panel } from '../'

class Fridge extends PureComponent {
  render() {
    const {
      coins,
      products,
      message,
      title,
      onPayDispatch,
      onChooseDispatch,
      onRemoveDispatch,
      onReturnCoinDispatch
    } = this.props;

    return (
      <React.Fragment>
        <h1>{title}</h1>

        <Display value={message}/>

        <Panel
          coins={coins}
          products={products}
          onPay={onPayDispatch}
          onChoose={onChooseDispatch}
          onRemove={onRemoveDispatch}
          onReturnCoin={onReturnCoinDispatch}
        />
      </React.Fragment>
    );
  }
}

Fridge.propTypes = {
  coins: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  message: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  onPayDispatch: PropTypes.func.isRequired,
  onChooseDispatch: PropTypes.func.isRequired,
  onRemoveDispatch: PropTypes.func.isRequired,
  onReturnCoinDispatch: PropTypes.func.isRequired
}

export default Fridge;
