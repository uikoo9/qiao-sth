## qiao-ai

[![npm version](https://img.shields.io/npm/v/qiao-ai.svg?style=flat-square)](https://www.npmjs.org/package/qiao-ai)
[![npm downloads](https://img.shields.io/npm/dm/qiao-ai.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-ai)

ai tools

## install

```shell
npm i qiao-ai
```

## usage

```javascript
// commonjs
const { KIMI } = require('qiao-ai');

// es6
import { KIMI } from 'qiao-ai';
```

## api

### KIMI

kimi

- apiKey
  - type: string
  - desc: kimi api key
- return
  - type: object
  - desc: kimi

```javascript
// kimi
const { KIMI } = require('qiao-ai');
const kimi = KIMI('kimi_api_key');
```

### kimi.chat

kimi chat

- msgs
  - type: array
  - desc: msgs
- callback
  - type: function
  - desc: callback function
- return
  - type: string
  - desc: res

```javascript
// normal
const res = await kimi.chat(['你好，我叫李雷，1+1等于多少？']);
console.log(res);

// callback
kimi.chat(['你好，我叫李雷，1+1等于多少？'], (content) => {
  console.log(content);
});
```
