import { applySpec, curryN } from 'ramda';

// Like applySpec but adds props to object
export const addProps = curryN(2, (spec, a, b) => ({
  ...a,
  ...applySpec(spec)(a, b)
}))
