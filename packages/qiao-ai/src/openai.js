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
