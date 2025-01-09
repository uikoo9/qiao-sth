## qiao-regions

[![npm version](https://img.shields.io/npm/v/qiao-regions.svg?style=flat-square)](https://www.npmjs.org/package/qiao-regions)
[![npm downloads](https://img.shields.io/npm/dm/qiao-regions.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-regions)

返回国家列表和国家下一级行政单位列表

## install

```shell
npm i qiao-regions
```

## usage

```javascript
// commonjs
const { countries } = require('qiao-regions');

// es6
import { countries } from 'qiao-regions';
```

## api

### countries

返回国家列表

- return
  - 类型: array
  - 说明: 国家数组

```javascript
countries();
```

### countriesAndStates

返回国家列表以及国家下一级行政单位列表

- return
  - 类型: array
  - 说明: 国家列表以及国家下一级行政单位列表

```javascript
countriesAndStates();
```
