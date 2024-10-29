// post
import { post } from 'qiao-ajax';

// util
import { getWebId, getUserId, constants } from './util.js';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-data');

/**
 * reportEvent
 * @param {*} appName
 * @param {*} eventName
 * @param {*} eventDetail
 * @returns
 */
export const reportEvent = async (appName, eventName, eventDetail) => {
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
    logger.info(methodName, 'options', options);

    // post
    const res = await post(constants.dataUrl, options);

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
};
