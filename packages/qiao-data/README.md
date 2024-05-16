## qiao-data

[![npm version](https://img.shields.io/npm/v/qiao-data.svg?style=flat-square)](https://www.npmjs.org/package/qiao-data)
[![npm downloads](https://img.shields.io/npm/dm/qiao-data.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-data)

基于[clarity](https://clarity.microsoft.com/)的数据埋点简单封装，详见：[AIGC 创业 100 问：选择数据埋点工具](https://blog.insistime.com/aigc-data)

## install

```shell
npm i qiao-data
```

## usage

```javascript
// commonjs
const { reportPV } = require('qiao-data');

// es6
import { reportPV } from 'qiao-data';
```

## api

### reportPV

上报页面 pv

- timeout
  - type: number
  - desc: timeout, ms, default: 300ms
- debug
  - type: boolean
  - desc: whether to display debug logs, default: false
- return
  - type: string
  - desc: ip

```javascript
// ip
const ip = await getIP(timeout);

// ip debug
const ip = await getIP(timeout, true);
```
