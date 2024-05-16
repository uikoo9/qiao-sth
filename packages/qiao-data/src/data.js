// cookie
import { cookie } from 'qiao.cookie.js';

// ls
import { ls } from 'qiao.ls.js';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-data');

/**
 * setData
 * @param {*} key
 * @param {*} value
 * @param {*} domain
 */
export const setData = (key, value, domain) => {
  const methodName = 'setData';

  logger.info(methodName, 'key', key);
  logger.info(methodName, 'value', value);
  logger.info(methodName, 'domain', domain);
  if (typeof localStorage !== 'undefined') {
    logger.info(methodName, 'use localStorage');

    ls(key, value, 1000 * 60 * 60 * 24);
  } else {
    logger.info(methodName, 'use cookie');

    const options = { vEnd: 60 * 60 * 24 };
    if (domain) options.sDomain = domain;
    logger.info(methodName, 'options', options);

    cookie(key, value, options);
  }
};

/**
 * getData
 * @param {*} key
 * @returns
 */
export const getData = (key) => {
  const methodName = 'getData';

  logger.info(methodName, 'key', key);
  if (typeof localStorage !== 'undefined') {
    logger.info(methodName, 'use localStorage');
    return ls(key);
  } else {
    logger.info(methodName, 'use cookie');
    return cookie(key);
  }
};
