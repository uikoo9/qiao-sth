// report
import { reportEvent } from './report.js';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-data');

/**
 * app
 */
export default (appName) => {
  const methodName = 'constructor';

  // check
  if (!appName) {
    logger.error(methodName, 'need appName');
    return;
  }

  // app
  const app = {};
  app.report = (eventName, eventDetail) => {
    reportEvent(appName, eventName, eventDetail);
  };

  //
  return app;
};
