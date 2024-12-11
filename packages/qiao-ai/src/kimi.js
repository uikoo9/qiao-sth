// openai
import OpenAI from 'openai';
import { chat } from './openai.js';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-ai');

/**
 * KIMI
 * @param {*} apiKey
 * @returns
 */
export const KIMI = (apiKey) => {
  const methodName = 'KIMI';

  // check
  if (!apiKey) {
    logger.error(methodName, 'need apiKey');
    return;
  }

  // client
  const client = new OpenAI({
    apiKey: apiKey,
    baseURL: 'https://api.moonshot.cn/v1',
  });

  // app
  const app = {};
  app.singleChat = async (msg) => {
    return await chat(client, msg);
  };

  //
  return app;
};
