'use strict';

var qs = require('qs');
var qiaoAjax = require('qiao-ajax');

// qs

/**
 * short link
 * @param {*} longLink
 * @param {*} timeout
 * @returns
 */
const shortLink = async (longLink, timeout) => {
  // check
  if (!longLink) return;

  // url
  const url = 'https://tiyee.cn/2/create_short_url';

  // config
  const config = {
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({ url: longLink }),
    timeout,
  };

  // post
  try {
    const res = await qiaoAjax.post(url, config);
    if (!res || res.status !== 200 || !res.data) return;

    return `https://${res.data.short_url}`;
  } catch (error) {
    console.log(error);
  }
};

exports.shortLink = shortLink;
