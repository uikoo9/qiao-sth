'use strict';

var qiaoAjax = require('qiao-ajax');
var qiao_cookie_js = require('qiao.cookie.js');
var uuid = require('uuid');
var qiao_log_js = require('qiao.log.js');

// cookie

/**
 * constants
 */
const constants = {
  dataUrl: 'https://data.vincentqiao.com/',
  dataAppId: 'ZAaFUcFoNc',
  dataAppKey: 'tHAcFnmLUhvbrdZYXxEl',
};

/**
 * getWebId
 * @returns
 */
const getWebId = () => {
  const webidKey = 'ist_webid';
  const webid = qiao_cookie_js.cookie(webidKey);
  if (webid) return webid;

  // set
  const uuid$1 = uuid.v4();
  qiao_cookie_js.cookie(webidKey, uuid$1);
  return uuid$1;
};

/**
 * getUserId
 * @returns
 */
const getUserId = () => {
  return qiao_cookie_js.cookie('userid');
};

// post
const logger$1 = qiao_log_js.Logger('qiao-data');

/**
 * reportEvent
 * @param {*} appName
 * @param {*} eventName
 * @param {*} eventDetail
 * @returns
 */
const reportEvent = async (appName, eventName, eventDetail) => {
  const methodName = 'reportEvent';

  // const
  const data_app_name = appName;
  const data_web_url = window.location.href;
  const data_web_id = getWebId();
  const data_user_id = getUserId();
  const data_event_name = eventName;
  const data_event_detail = eventDetail || '';

  // report
  try {
    // options
    const options = {
      data: {
        dataAppId: constants.dataAppId,
        dataAppKey: constants.dataAppKey,
        data_app_name: data_app_name,
        data_web_url: data_web_url,
        data_web_id: data_web_id,
        data_user_id: data_user_id,
        data_event_name: data_event_name,
        data_event_detail: data_event_detail,
      },
    };
    logger$1.info(methodName, 'options', options);

    // post
    const res = await qiaoAjax.post(constants.dataUrl, options);

    // check status
    if (res.status !== 200) {
      logger$1.error(methodName, 'status not 200', res);
      return;
    }

    // check data
    if (!res.data || res.data.type !== 'success') {
      logger$1.error(methodName, 'type not success', res);
      return;
    }

    // data
    logger$1.info(methodName, 'data', res.data);
  } catch (error) {
    logger$1.error(methodName, 'error', error);
  }
};

// report
const logger = qiao_log_js.Logger('qiao-data');

/**
 * app
 */
var index = (appName) => {
  const methodName = 'constructor';

  // check
  if (!appName) {
    logger.error(methodName, 'need appName');
    return;
  }

  // app
  const app = {};
  app.report = (eventName, eventDetail) => {
    reportEvent(appName, eventName, eventDetail);
  };

  //
  return app;
};

module.exports = index;
