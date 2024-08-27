// offline to online
import { offlineToOnline as offlineToOnlineWithPing } from 'offline-to-online';

// is online
import { isOnline } from './is-online.js';

/**
 * offlineToOnline
 * @param {*} callback
 * @param {*} time
 */
export const offlineToOnline = (callback, time) => {
  offlineToOnlineWithPing(null, isOnline, callback, time);
};
