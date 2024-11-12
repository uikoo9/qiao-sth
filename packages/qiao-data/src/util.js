// cookie
import { cookie } from 'qiao.cookie.js';

// ls
import { ls } from 'qiao.ls.js';

// uuid
import { v4 as uuidv4 } from 'uuid';

/**
 * getWebId
 * @returns
 */
export const getWebId = () => {
  const webidKey = 'ist_webid';
  const webid = ls(webidKey) || cookie(webidKey);
  if (webid) return webid;

  // set
  const uuid = uuidv4();
  ls(webidKey, uuid);
  cookie(webidKey, uuid);

  // r
  return uuid;
};

/**
 * getUserId
 * @returns
 */
export const getUserId = () => {
  const userinfo = ls('userinfo');
  return userinfo && userinfo.id ? userinfo.id : cookie('userid');
};
