/**
 * chat
 * @param {*} client
 * @param {*} model
 * @param {*} messages
 * @param {*} callback
 * @returns
 */
export const chat = async (client, model, messages, callback) => {
  // options
  const options = {
    model: model,
    messages: messages,
    temperature: 0.3,
  };
  if (callback) options.stream = true;

  // res
  const res = await client.chat.completions.create(options);

  // stream
  if (callback) {
    for await (const chunk of res) {
      callback(chunk.choices[0]?.delta?.content || '');
    }
    return;
  }

  // completion
  return !res || !res.choices || !res.choices.length || !res.choices[0].message || !res.choices[0].message.content
    ? null
    : res.choices[0].message.content;
};
