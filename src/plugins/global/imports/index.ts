import { importFactory } from './importFactory';

export const importComponent = importFactory('components', 'color: blue');
export const importPage = importFactory('pages', 'color: #e53935');

export { importFactory };
export * from './use';
