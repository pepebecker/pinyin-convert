'use strict'

const convert = require('../index')

describe('Convert', () => {
	it('should convert to Pinyin with tone marks', () => {
		return convert('wǒ de māo xǐhuān hē niúnǎi', {keepSpaces: true}).then((data) => {
			data.should.equal('wo3 de mao1 xi3huan1 he1 niu2nai3')
		})
	})
	it('should convert to Pinyin with tone numbers', () => {
		return convert('wo3 de mao1 xi3huan1 he1 niu2nai3', {keepSpaces: true}).then((data) => {
			data.should.equal('wǒ de māo xǐhuān hē niúnǎi')
		})
	})
	it('should convert to Pinyin with tone marks', () => {
		return convert('我的猫喜欢喝牛奶').then((data) => {
			data.should.equal('wǒ de māo xǐ huān hē niú nǎi')
		})
	})
	it('should convert to Pinyin with tone numbers', () => {
		return convert('我的猫喜欢喝牛奶', {numbered: true}).then((data) => {
			data.should.equal('wo3 de mao1 xi3 huan1 he1 niu2 nai3')
		})
	})
})
