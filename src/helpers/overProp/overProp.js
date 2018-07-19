import { useWith, over, lensProp, identity } from 'ramda';

// overProp :: String -> (a -> b) -> a -> c
export const overProp = useWith(over, [lensProp, identity, identity]);
