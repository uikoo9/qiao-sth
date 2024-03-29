// ava
const test = require('ava');

// jsdom
const { JSDOM } = require('jsdom');

// ip
const { getIP } = require('./index.js');

// nodejs
test.serial('get ip on nodejs', async (t) => {
  t.timeout(2000);

  const ip = await getIP(2000, true);
  t.log(ip);
  t.truthy(ip);
});

// browser
test.serial('get ip on browser', async (t) => {
  t.timeout(2000);

  const dom = new JSDOM('', { url: 'http://localhost' });
  global.document = dom.window.document;

  const ip = await getIP(2000, true);
  t.log(ip);
  t.truthy(ip);
});
