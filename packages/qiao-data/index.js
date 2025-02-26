'use strict';

var qiaoAjax = require('qiao-ajax');
var qiao_cookie_js = require('qiao.cookie.js');
var qiao_ls_js = require('qiao.ls.js');
var uuid = require('uuid');
var qiao_log_js = require('qiao.log.js');

// cookie

/**
 * getWebId
 * @returns
 */
const getWebId = () => {
  const webidKey = 'ist_webid';
  const webid = qiao_ls_js.ls(webidKey) || qiao_cookie_js.cookie(webidKey);
  if (webid) return webid;

  // set
  const uuid$1 = uuid.v4();
  qiao_ls_js.ls(webidKey, uuid$1);
  qiao_cookie_js.cookie(webidKey, uuid$1);

  // r
  return uuid$1;
};

/**
 * getUserId
 * @returns
 */
const getUserId = () => {
  const userinfo = qiao_ls_js.ls('userinfo');
  return userinfo && userinfo.id ? userinfo.id : qiao_cookie_js.cookie('userid');
};

// post
const logger$1 = qiao_log_js.Logger('qiao-data');

/**
 * reportWebData
 * @param {*} appId
 * @param {*} appKey
 * @param {*} appName
 * @param {*} eventName
 * @param {*} eventDetail
 */
const reportWebData = async (appId, appKey, appName, eventName, eventDetail) => {
  // const
  const data_app_name = appName;
  const data_web_id = getWebId();
  const data_user_id = getUserId();
  const data_event_name = eventName;
  const data_event_detail = eventDetail || '';

  // report
  await report(appId, appKey, data_app_name, data_web_id, data_user_id, data_event_name, data_event_detail);
};

/**
 * reportServerData
 * @param {*} appId
 * @param {*} appKey
 * @param {*} appName
 * @param {*} userId
 * @param {*} eventName
 * @param {*} eventDetail
 */
const reportServerData = async (appId, appKey, appName, userId, eventName, eventDetail) => {
  // const
  const data_app_name = appName;
  const data_web_id = '';
  const data_user_id = userId;
  const data_event_name = eventName;
  const data_event_detail = eventDetail || '';

  // report
  await report(appId, appKey, data_app_name, data_web_id, data_user_id, data_event_name, data_event_detail);
};

// report
async function report(appId, appKey, data_app_name, data_web_id, data_user_id, data_event_name, data_event_detail) {
  const methodName = 'report';

  // report
  try {
    // options
    const options = {
      data: {
        appId: appId,
        appKey: appKey,
        data_app_name: data_app_name,
        data_web_id: data_web_id,
        data_user_id: data_user_id,
        data_event_name: data_event_name,
        data_event_detail: data_event_detail,
      },
    };
    logger$1.info(methodName, 'options', options);

    // post
    const res = await qiaoAjax.post('https://data.vincentqiao.com/', options);

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
}

// report
const logger = qiao_log_js.Logger('qiao-data');

/**
 * app
 */
var index = (appId, appKey, appName) => {
  const methodName = 'constructor';

  // check
  if (!appId) {
    logger.error(methodName, 'need appId');
    return;
  }
  if (!appKey) {
    logger.error(methodName, 'need appKey');
    return;
  }
  if (!appName) {
    logger.error(methodName, 'need appName');
    return;
  }

  // app
  const app = {};
  app.reportWebData = (eventName, eventDetail) => {
    reportWebData(appId, appKey, appName, eventName, eventDetail);
  };
  app.reportServerData = (userId, eventName, eventDetail) => {
    reportServerData(appId, appKey, appName, userId, eventName, eventDetail);
  };

  //
  return app;
};

module.exports = index;
