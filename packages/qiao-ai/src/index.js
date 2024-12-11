// report
import { reportWebData, reportServerData } from './report.js';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-ai');

/**
 * app
 */
export default (appId, appKey, appName) => {
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
