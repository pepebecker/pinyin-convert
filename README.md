# Pinyin Convert

[![npm version](https://img.shields.io/npm/v/pinyin-convert.svg)](https://www.npmjs.com/package/pinyin-convert)
[![Travis Build Status](https://travis-ci.org/pepebecker/pinyin-convert.svg)](https://travis-ci.org/pepebecker/pinyin-convert)
[![Greenkeeper badge](https://badges.greenkeeper.io/pepebecker/pinyin-convert.svg)](https://greenkeeper.io/)
[![dependency status](https://img.shields.io/david/pepebecker/pinyin-convert.svg)](https://david-dm.org/pepebecker/pinyin-convert)
[![dev dependency status](https://img.shields.io/david/dev/pepebecker/pinyin-convert.svg)](https://david-dm.org/pepebecker/pinyin-convert#info=devDependencies)
[![MIT-licensed](https://img.shields.io/github/license/pepebecker/pinyin-convert.svg)](https://opensource.org/licenses/MIT)
[![chat on gitter](https://badges.gitter.im/pepebecker.svg)](https://gitter.im/pepebecker)

Checkout the [`pinyin-webinterface`](https://github.com/pepebecker/pinyin) which uses this module in the backend.

## Install

```shell
npm install pinyin-convert
```

## Usage

```js
const convert = require('pinyin-convert')

convert('Test: wǒ de māo xǐhuān hē niúnǎi')
.then(console.log) // Te wo3 de mao1 xi3 huan1 he1 niu2 nai3

convert('Test: wo3 de mao1 xi3huan1 he1 niu2nai3')
.then(console.log) // Te wǒ de māo xǐ huān hē niú nǎi

convert('Test: wǒ de māo xǐhuān hē niúnǎi', { everything: true })
.then(console.log) // Test: wo3 de mao1 xi3huan1 he1 niu2nai3

convert('Test: wo3 de mao1 xi3huan1 he1 niu2nai3', { everything: true })
.then(console.log) // Test: wǒ de māo xǐhuān hē niúnǎi

convert('我的猫喜欢喝牛奶')
.then(console.log)
// [ 'wǒ ', [ 'de', 'dī', 'dí', 'dì' ], ' māo xǐ huan ', [ 'hē', 'hè' ], ' niú nǎi' ]

convert('我的猫喜欢喝牛奶', { segmented: true })
.then(console.log)
// [ 'wǒ ', [ 'de', 'dī', 'dí', 'dì' ], ' māo xǐhuan ', [ 'hē', 'hè' ], ' niúnǎi' ]

convert('我的猫喜欢喝牛奶', { numbered: true, segmented: true })
.then(console.log)
// [ 'wo3 ', ['de5', 'di1', 'di2', 'di4'], ' mao1 xǐ5huan1 ', ['he1', 'he4'], ' niu2nai3' ]

convert('Test: 我的猫喜欢喝牛奶', { everything: true, segmented: true })
.then(console.log)
// [ 'test: wǒ ', [ 'de', 'dī', 'dí', 'dì' ], ' māo xǐhuan ', [ 'hē', 'hè' ], ' niúnǎi' ]
```

## Related

- [`pinyin-utils`](https://github.com/pepebecker/pinyin-utils)
- [`pinyin-split`](https://github.com/pepebecker/pinyin-split)
- [`find-hanzi`](https://github.com/pepebecker/find-hanzi)
- [`hsk-words`](https://github.com/pepebecker/hsk-words)
- [`cedict`](https://github.com/pepebecker/cedict)
- [`mdbg`](https://github.com/pepebecker/mdbg)
- [`pinyin-or-hanzi`](https://github.com/pepebecker/pinyin-or-hanzi)
- [`hanzi-to-pinyin`](https://github.com/pepebecker/hanzi-to-pinyin)
- [`pinyin-rest`](https://github.com/pepebecker/pinyin-rest)
- [`pinyin-api`](https://github.com/pepebecker/pinyin-api)
- [`pinyin-bot-core`](https://github.com/pepebecker/pinyin-bot-core)
- [`pinyin-telegram`](https://github.com/pepebecker/pinyin-telegram)
- [`pinyin-messenger`](https://github.com/pepebecker/pinyin-messenger)
- [`pinyin-line`](https://github.com/pepebecker/pinyin-line)
- [`pinyin-chrome`](https://github.com/pepebecker/pinyin-chrome)
- [`pinyin-cli`](https://github.com/pepebecker/pinyin-cli)
- [`hanzi-cli`](https://github.com/pepebecker/hanzi-cli)

## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/pepebecker/pinyin-convert/issues).
