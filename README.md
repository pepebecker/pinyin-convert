# Pinyin Converter

[![Travis Build Status](https://travis-ci.org/pepebecker/pinyin-converter.svg)](https://travis-ci.org/pepebecker/pinyin-converter)
[![Coverage Status](https://coveralls.io/repos/github/pepebecker/pinyin-converter/badge.svg)](https://coveralls.io/github/pepebecker/pinyin-converter)
[![dependency status](https://img.shields.io/david/pepebecker/pinyin-converter.svg)](https://david-dm.org/pepebecker/pinyin-converter)
[![dev dependency status](https://img.shields.io/david/dev/pepebecker/pinyin-converter.svg)](https://david-dm.org/pepebecker/pinyin-converter#info=devDependencies)
[![MIT-licensed](https://img.shields.io/github/license/pepebecker/pinyin-converter.svg)](https://opensource.org/licenses/MIT)
[![chat on gitter](https://badges.gitter.im/pepebecker.svg)](https://gitter.im/pepebecker)

## Install

```shell
npm install pinyin-converter@pepebecker/pinyin-converter
```

## Usage

```js
const convert = require('pinyin-converter')

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

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/pepebecker/pinyin-converter/issues).