'use strict';

var qiaoAjax = require('qiao-ajax');
var json = require('qiao-json');
var qiao_log_js = require('qiao.log.js');

// ajax
const logger = qiao_log_js.Logger('qiao-fetch');

/**
 * fetch
 * @param {*} url
 * @param {*} data
 * @returns
 */
const fetch = async (url, data) => {
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
const fetchWithToken = async (url, data, userid, usertoken) => {
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
    const res = await qiaoAjax.post(url, options);

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

exports.fetch = fetch;
exports.fetchWithToken = fetchWithToken;
