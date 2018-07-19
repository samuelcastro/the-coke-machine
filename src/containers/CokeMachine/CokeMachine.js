import { connect } from 'react-redux';
import { prop } from 'ramda';
import { Fridge } from '../../components';

import {
  onPayDispatch, onChooseDispatch,
  onRemoveDispatch, onReturnCoinDispatch
} from './CokeMachine.helper'

const mapStateToProps = prop('coke');

const mapDispatchToProps = (dispatch) => ({
  onPayDispatch: onPayDispatch(dispatch),
  onChooseDispatch: onChooseDispatch(dispatch),
  onRemoveDispatch: onRemoveDispatch(dispatch),
  onReturnCoinDispatch: onReturnCoinDispatch(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Fridge);
