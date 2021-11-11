export const notReachable = (_: never) => {
  throw new Error(`should never be reached ${_}`);
};
