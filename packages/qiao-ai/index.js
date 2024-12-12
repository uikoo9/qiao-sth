'use strict';

var OpenAI = require('openai');
var qiao_log_js = require('qiao.log.js');

// default msg
const defaultMsg = [
  {
    role: 'system',
    content:
      '你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。',
  },
];

/**
 * chat
 * @param {*} client
 * @param {*} msgs
 */
const chat = async (client, msgs) => {
  // messages
  const messages = msgs.map((msg) => ({
    role: 'user',
    content: msg,
  }));

  // completion
  const completion = await client.chat.completions.create({
    model: 'moonshot-v1-8k',
    messages: defaultMsg.concat(messages),
    temperature: 0.3,
  });

  // check
  if (
    !completion ||
    !completion.choices ||
    !completion.choices.length ||
    !completion.choices[0].message ||
    !completion.choices[0].message.content
  )
    return;

  // r
  return completion.choices[0].message.content;
};

// openai
const logger = qiao_log_js.Logger('qiao-ai');

/**
 * KIMI
 * @param {*} apiKey
 * @returns
 */
const KIMI = (apiKey) => {
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
  app.chat = async (msgs) => {
    return await chat(client, msgs);
  };

  //
  return app;
};

exports.KIMI = KIMI;
