// ajax
import { post } from 'qiao-ajax';

// json
import json from 'qiao-json';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-fetch');

/**
 * fetch
 * @param {*} url
 * @param {*} data
 * @returns
 */
export const fetch = async (url, data) => {
  return await ajax(url, data);
};

/**
 * fetchWithToken
 * @param {*} url
 * @param {*} data
 * @param {*} userid
 * @param {*} usertoken
 * @returns
 */
export const fetchWithToken = async (url, data, userid, usertoken) => {
  return await ajax(url, data, { userid, usertoken });
};

// ajax
async function ajax(url, data, headers) {
  const methodName = 'ajax';

  // send
  try {
    // options
    const options = {
      data: data,
    };
    if (headers) options.headers = headers;

    // res
    const res = await post(url, options);

    // check
    if (res.status !== 200) {
      logger.error(methodName, 'res', res);
      return json.fail(`res.status is ${res.status}`);
    }

    // r
    return res.data;
  } catch (error) {
    logger.error(methodName, error);
    return json.fail('fetch network error');
  }
}
