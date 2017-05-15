# Pinyin Convert

[![Travis Build Status](https://travis-ci.org/pepebecker/pinyin-convert.svg)](https://travis-ci.org/pepebecker/pinyin-convert)
[![Coverage Status](https://coveralls.io/repos/github/pepebecker/pinyin-convert/badge.svg)](https://coveralls.io/github/pepebecker/pinyin-convert)
[![dependency status](https://img.shields.io/david/pepebecker/pinyin-convert.svg)](https://david-dm.org/pepebecker/pinyin-convert)
[![dev dependency status](https://img.shields.io/david/dev/pepebecker/pinyin-convert.svg)](https://david-dm.org/pepebecker/pinyin-convert#info=devDependencies)
[![MIT-licensed](https://img.shields.io/github/license/pepebecker/pinyin-convert.svg)](https://opensource.org/licenses/MIT)
[![chat on gitter](https://badges.gitter.im/pepebecker.svg)](https://gitter.im/pepebecker)

## Install

```shell
npm install pinyin-convert@pepebecker/pinyin-convert
```

## Related

- [`pinyin-utils`](https://github.com/pepebecker/pinyin-utils)
- [`pinyin-split`](https://github.com/pepebecker/pinyin-split)
- [`find-hanzi`](https://github.com/pepebecker/find-hanzi)
- [`pinyin-or-hanzi`](https://github.com/pepebecker/pinyin-or-hanzi)
- [`hanzi-to-pinyin`](https://github.com/pepebecker/hanzi-to-pinyin)

## Usage

```js
const convert = require('pinyin-convert')

convert('wǒ de māo xǐhuān hē niúnǎi', {keepSpaces: true})
.then(console.log) // wo3 de mao1 xi3huan1 he1 niu2nai3
.catch(console.error)

convert('wo3 de mao1 xi3huan1 he1 niu2nai3', {keepSpaces: true})
.then(console.log) // wǒ de māo xǐhuān hē niúnǎi
.catch(console.error)

convert('我的猫喜欢喝牛奶')
.then(console.log) // wǒ de māo xǐ huān hē niú nǎi
.catch(console.error)

convert('我的猫喜欢喝牛奶', {numbered: true})
.then(console.log) // wo3 de mao1 xi3 huan1 he1 niu2 nai3
.catch(console.error)
```

## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/pepebecker/pinyin-convert/issues).