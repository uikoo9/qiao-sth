// cookie
import { cookie } from 'qiao.cookie.js';

// uuid
import { v4 as uuidv4 } from 'uuid';

/**
 * getWebId
 * @returns
 */
export const getWebId = () => {
  const webidKey = 'ist_webid';
  const webid = cookie(webidKey);
  if (webid) return webid;

  // set
  const uuid = uuidv4();
  cookie(webidKey, uuid);
  return uuid;
};

/**
 * getUserId
 * @returns
 */
export const getUserId = () => {
  return cookie('userid');
};
