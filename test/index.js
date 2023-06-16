'use strict'

const assert = require('assert').strict;
const convert = require('../index')

describe('Convert Mandarin to Pinyin', function() {
	this.timeout(5000);

	it('should convert Mandarin to marked Pinyin (segmented)', async () => {
		const data = await convert('我的猫喜欢喝牛奶', { segmented: true });
		assert.deepEqual(data, ['wǒ ', ['de', 'dī', 'dí', 'dì'], ' māo xǐhuan ', ['hē', 'hè'], ' niúnǎi']);
	});

	it('should convert Mandarin to numbered Pinyin (segmented)', async () => {
		const data = await convert('我的猫喜欢喝牛奶', { segmented: true, numbered: true });
		assert.deepEqual(data, ['wo3 ', ['de5', 'di1', 'di2', 'di4'], ' mao1 xi3huan5 ', ['he1', 'he4'], ' niu2nai3']);
	});

	it('should convert Mandarin to marked Pinyin', async () => {
		const data = await convert('我的猫喜欢喝牛奶');
		assert.deepEqual(data, ['wǒ ', ['de', 'dī', 'dí', 'dì'], ' māo xǐ huan ', ['hē', 'hè'], ' niú nǎi']);
	});

	it('should convert Mandarin to numbered Pinyin', async () => {
		const data = await convert('我的猫喜欢喝牛奶', { numbered: true });
		assert.deepEqual(data, ['wo3 ', ['de5', 'di1', 'di2', 'di4'], ' mao1 xi3 huan5 ', ['he1', 'he4'], ' niu2 nai3']);
	});
});

describe('Convert between marked and numbered Pinyin', function() {
	this.timeout(5000);

	it('should convert tone marks to tone numbers', async () => {
		const data = await convert('wǒ de māo xǐhuan hē niúnǎi');
		assert.strictEqual(data, 'wo3 de mao1 xi3huan he1 niu2nai3');
	});

	it('should convert tone numbers to tone marks', async () => {
		const data = await convert('wo3 de mao1 xi3huan5 he1 niu2nai3');
		assert.strictEqual(data, 'wǒ de māo xǐhuan hē niúnǎi');
	});

	it('should convert tone marks to tone numbers', async () => {
		const data = await convert('wǒ de māo xǐhuan hē niúnǎi', { everything: true });
		assert.strictEqual(data, 'wo3 de mao1 xi3huan he1 niu2nai3');
	});

	it('should convert tone numbers to tone marks', async () => {
		const data = await convert('wo3 de mao1 xi3huan5 he1 niu2nai3', { everything: true });
		assert.strictEqual(data, 'wǒ de māo xǐhuan hē niúnǎi');
	});
});

describe('Try to convert Non-Chinese text', function() {
	this.timeout(5000);

	it('should leave the text the way it is', async () => {
		const optionsList = [
			{},
			{ segmented: true },
			{ numbered: true },
			{ segmented: true, numbered: true }
		]
		const text = 'wo de mao xihuan he niunai';

		for(const options of optionsList){
			const data = await convert(text, options);
			assert.strictEqual(data, text);
		}
	});
});
