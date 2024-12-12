'use strict';

var OpenAI = require('openai');
var qiao_log_js = require('qiao.log.js');

/**
 * chat
 * @param {*} client
 * @param {*} model
 * @param {*} messages
 * @param {*} callback
 * @returns
 */
const chat = async (client, model, messages, callback) => {
  // options
  const options = {
    model: model,
    messages: messages,
    temperature: 0.3,
  };
  if (callback) options.stream = true;

  // completion
  const completion = await client.chat.completions.create(options);

  // stream
  if (callback) {
    completion.on('content', (delta) => {
      callback(delta);
    });
    return;
  }

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

exports.KIMI = KIMI;
