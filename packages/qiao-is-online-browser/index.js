'use strict';

var offlineToOnline$1 = require('offline-to-online');

/**
 * isOnline
 * @param {*} src
 * @returns
 */
const isOnline = (src) => {
  return new Promise(function (resolve, reject) {
    if (!src) return reject(Error('need online img src'));

    let img = new Image();
    img.src = `${src}?r=${Math.random()}`;
    img.onload = () => {
      resolve('online');
    };
    img.onerror = () => {
      resolve('offline');
    };
  });
};

// offline to online

/**
 * offlineToOnline
 * @param {*} src
 * @param {*} callback
 * @param {*} time
 */
const offlineToOnline = (src, callback, time) => {
  offlineToOnline$1.offlineToOnlineWithSrc(src, isOnline, callback, time);
};

exports.isOnline = isOnline;
exports.offlineToOnline = offlineToOnline;
