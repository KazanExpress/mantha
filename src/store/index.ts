export * from './test';

export interface IRootState {
  test: import('./test').TestState;
}
