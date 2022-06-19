/**
 * Return url for rented listed with added filters
 */
import { Config } from '../types';

export function getRentedPropertyUrl(config: Config) {
  const url = new URL(config.daft.rentedPropertyUrl);

  // Add sorting parameter
  addOptionalParameter(url, 'sort', config.sorting);

  // Add filtering parameter
  if (config.filters) {
    const { maxBudget, minBeds, maxBeds } = config.filters;

    // Budget
    addOptionalParameter(url, 'rentalPrice_to', maxBudget?.toString());

    // Beds
    addOptionalParameter(url, 'numBeds_from', minBeds?.toString());
    addOptionalParameter(url, 'numBeds_to', maxBeds?.toString());
  }

  return url.href;
}

function addOptionalParameter(url: URL, parameter: string, value?: string) {
  if (value) {
    url.searchParams.append(parameter, value);
  }
}
