// openai
import OpenAI from 'openai';
import { chat } from './openai.js';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-ai');

// kimi model
const kimiModel = 'moonshot-v1-8k';

// kimi msg
const kimiMsg = [
  {
    role: 'system',
    content:
      '你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。',
  },
];

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
  app.chat = async (msgs, callback) => {
    // messages
    const messages = kimiMsg.concat(
      msgs.map((msg) => ({
        role: 'user',
        content: msg,
      })),
    );

    // chat
    return await chat(client, kimiModel, messages, callback);
  };

  //
  return app;
};
