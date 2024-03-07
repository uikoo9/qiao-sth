// ava
const test = require('ava');

// jsdom
const { JSDOM } = require('jsdom');

// link
const { shortLink } = require('./index.js');

// nodejs
test('short link on nodejs', async (t) => {
  t.timeout(3000);

  const link = await shortLink('https://insistime.com/', 500);
  t.log(link);
  t.truthy(link);
});

// browser
test('short link on browser', async (t) => {
  t.timeout(3000);

  const dom = new JSDOM('', { url: 'http://localhost' });
  global.document = dom.window.document;

  const link = await shortLink('https://insistime.com/', 1000);
  t.log(link);
  t.truthy(link);
});
