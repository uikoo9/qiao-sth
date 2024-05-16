'use strict';

var uuid = require('uuid');
var qiao_cookie_js = require('qiao.cookie.js');
var qiao_ls_js = require('qiao.ls.js');
var qiao_log_js = require('qiao.log.js');

// cookie
const logger$1 = qiao_log_js.Logger('qiao-data');

/**
 * setData
 * @param {*} key
 * @param {*} value
 * @param {*} domain
 */
const setData = (key, value, domain) => {
  const methodName = 'setData';

  logger$1.info(methodName, 'key', key);
  logger$1.info(methodName, 'value', value);
  logger$1.info(methodName, 'domain', domain);
  if (typeof localStorage !== 'undefined') {
    logger$1.info(methodName, 'use localStorage');

    qiao_ls_js.ls(key, value, 1000 * 60 * 60 * 24);
  } else {
    logger$1.info(methodName, 'use cookie');

    const options = { vEnd: 60 * 60 * 24 };
    if (domain) options.sDomain = domain;
    logger$1.info(methodName, 'options', options);

    qiao_cookie_js.cookie(key, value, options);
  }
};

/**
 * getData
 * @param {*} key
 * @returns
 */
const getData = (key) => {
  const methodName = 'getData';

  logger$1.info(methodName, 'key', key);
  if (typeof localStorage !== 'undefined') {
    logger$1.info(methodName, 'use localStorage');
    return qiao_ls_js.ls(key);
  } else {
    logger$1.info(methodName, 'use cookie');
    return qiao_cookie_js.cookie(key);
  }
};

// uuid
const logger = qiao_log_js.Logger('qiao-data');

/**
 * reportPV
 */
const reportPV = () => {
  logger.info('reportPV', 'pv');
  window.clarity && window.clarity('event', 'web.pv');
};

/**
 * reportUV
 * @param {*} domain
 */
const reportUV = (domain) => {
  const key = 'qiao-data-userid';
  const userid = getData(key);
  if (!userid) {
    const uuid$1 = uuid.v4();
    setData(key, uuid$1, domain);

    logger.info('reportUV', 'uv', uuid$1);
    window.clarity && window.clarity('event', 'web.uv');
  }
};

/**
 * reportEvent
 */
const reportEvent = (event) => {
  logger.info('reportEvent', 'event', event);
  window.clarity && window.clarity('event', event);
};

exports.reportEvent = reportEvent;
exports.reportPV = reportPV;
exports.reportUV = reportUV;
