// offline to online
import { offlineToOnlineWithSrc } from 'offline-to-online';

// is online
import { isOnline } from './is-online.js';

/**
 * offlineToOnline
 * @param {*} src
 * @param {*} callback
 * @param {*} time
 */
export const offlineToOnline = (src, callback, time) => {
  offlineToOnlineWithSrc(src, isOnline, callback, time);
};
