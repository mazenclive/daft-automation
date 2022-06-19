import { Config } from './types';

export const config: Config = {
  daft: {
    baseUrl: 'https://www.daft.ie/',
    rentedPropertyUrl: 'https://www.daft.ie/property-for-rent/ireland',
  },
  sorting: 'publishDateDesc',
  filters: {
    maxBudget: 3000,
    minBeds: 2,
  },
} as const;
