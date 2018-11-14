'use strict'

const convert = require('../index')

describe('Convert Mandarin to Pinyin', () => {
	it('should convert Mandarin to marked Pinyin (segmented)', () => {
		return convert('我的猫喜欢喝牛奶', { segmented: true }).then(data => {
			data.should.deepEqual(['wǒ ', ['de', 'dī', 'dí', 'dì'], ' māo xǐhuan ', ['hē', 'hè'], ' niúnǎi'])
		})
	})
	it('should convert Mandarin to numbered Pinyin (segmented)', () => {
		return convert('我的猫喜欢喝牛奶', { segmented: true, numbered: true }).then(data => {
			data.should.deepEqual(['wo3 ', ['de5', 'di1', 'di2', 'di4'], ' mao1 xi3huan5 ', ['he1', 'he4'], ' niu2nai3'])
		})
	})
	it('should convert Mandarin to marked Pinyin', () => {
		return convert('我的猫喜欢喝牛奶').then(data => {
			data.should.deepEqual(['wǒ ', ['de', 'dī', 'dí', 'dì'], ' māo xǐ huan ', ['hē', 'hè'], ' niú nǎi'])
		})
	})
	it('should convert Mandarin to numbered Pinyin', () => {
		return convert('我的猫喜欢喝牛奶', { numbered: true }).then(data => {
			data.should.deepEqual(['wo3 ', ['de5', 'di1', 'di2', 'di4'], ' mao1 xi3 huan5 ', ['he1', 'he4'], ' niu2 nai3'])
		})
	})
})

describe('Convert between marked and numbered Pinyin', () => {
	it('should convert tone marks to tone numbers', () => {
		return convert('wǒ de māo xǐhuan hē niúnǎi').then(data => {
			data.should.equal('wo3 de mao1 xi3huan he1 niu2nai3')
		})
	})
	it('should convert tone numbers to tone marks', () => {
		return convert('wo3 de mao1 xi3huan5 he1 niu2nai3').then(data => {
			data.should.equal('wǒ de māo xǐhuan hē niúnǎi')
		})
	})
	it('should convert tone marks to tone numbers', () => {
		return convert('wǒ de māo xǐhuan hē niúnǎi', { everything: true }).then(data => {
			data.should.equal('wo3 de mao1 xi3huan he1 niu2nai3')
		})
	})
	it('should convert tone numbers to tone marks', () => {
		return convert('wo3 de mao1 xi3huan5 he1 niu2nai3', { everything: true }).then(data => {
			data.should.equal('wǒ de māo xǐhuan hē niúnǎi')
		})
	})
})

describe('Try to convert Non-Chinese text', () => {
	it('should leave the text the way it is', () => {
		const optionsList = [
			{},
			{ segmented: true },
			{ numbered: true },
			{ segmented: true, numbered: true }
		]
		const text = 'wo de mao xihuan he niunai'
		return Promise.all(optionsList.map(options => {
			return convert(text, options).then(data => data.should.equal(text))
		}))
	})
})
