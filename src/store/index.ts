export * from './modules';

export interface IRootState {
  test: import('./modules').TestState;

  // Add your module types in there
}
