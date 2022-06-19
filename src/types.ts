type SortType = 'publishDateDesc' | 'priceAsc' | 'priceDesc';

export type Config = {
  daft: {
    baseUrl: string;
    rentedPropertyUrl: string;
  };
  filters?: {
    maxBudget?: number;
    minBeds?: number;
    maxBeds?: number;
  };
  sorting?: SortType;
};
