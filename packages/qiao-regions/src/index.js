// regions
import regions from './regions.json';

/**
 * countries
 * @returns
 */
export const countries = () => {
  return regions.map((region) => region.country);
};

/**
 * countriesAndStates
 * @returns
 */
export const countriesAndStates = () => {
  return regions;
};
