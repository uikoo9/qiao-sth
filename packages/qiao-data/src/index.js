// uuid
import { v4 as uuidv4 } from 'uuid';

// data
import { setData, getData } from './data.js';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-data');

/**
 * reportPV
 */
export const reportPV = () => {
  logger.info('reportPV', 'pv');
  window.clarity && window.clarity('event', 'web.pv');
};

/**
 * reportUV
 * @param {*} domain
 */
export const reportUV = (domain) => {
  const key = 'qiao-data-userid';
  const userid = getData(key);
  if (!userid) {
    const uuid = uuidv4();
    setData(key, uuid, domain);

    logger.info('reportUV', 'uv', uuid);
    window.clarity && window.clarity('event', 'web.uv');
  }
};

/**
 * reportEvent
 */
export const reportEvent = (event) => {
  logger.info('reportEvent', 'event', event);
  window.clarity && window.clarity('event', event);
};
