// post
import { post } from 'qiao-ajax';

// util
import { getWebId, getUserId } from './util.js';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-data');

/**
 * reportWebData
 * @param {*} appId
 * @param {*} appKey
 * @param {*} appName
 * @param {*} eventName
 * @param {*} eventDetail
 */
export const reportWebData = async (appId, appKey, appName, eventName, eventDetail) => {
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
export const reportServerData = async (appId, appKey, appName, userId, eventName, eventDetail) => {
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
        dataAppId: appId,
        dataAppKey: appKey,
        data_app_name: data_app_name,
        data_web_id: data_web_id,
        data_user_id: data_user_id,
        data_event_name: data_event_name,
        data_event_detail: data_event_detail,
      },
    };
    logger.info(methodName, 'options', options);

    // post
    const res = await post('https://data.vincentqiao.com/', options);

    // check status
    if (res.status !== 200) {
      logger.error(methodName, 'status not 200', res);
      return;
    }

    // check data
    if (!res.data || res.data.type !== 'success') {
      logger.error(methodName, 'type not success', res);
      return;
    }

    // data
    logger.info(methodName, 'data', res.data);
  } catch (error) {
    logger.error(methodName, 'error', error);
  }
}
