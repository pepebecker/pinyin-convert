'use strict'

const hanziToPinyin = require('hanzi-to-pinyin')
const splitPinyin = require('pinyin-split')
const pinyinOrHanzi = require('pinyin-or-hanzi')
const utils = require('pinyin-utils')

const convertPinyin = async (text, type, opts) => {
	let words = splitPinyin(text, true)
	if (opts.numbered && type !== 'pinyin-numbered') {
		words = utils.markToNumber(words, false)
	}
	else if (opts.marked && type !== 'pinyin-marked') {
		words = utils.numberToMark(words)
	}
	else if (!opts.numbered) {
		if (type === 'pinyin-marked') {
			words = utils.markToNumber(words, false)
		}
		if (type === 'pinyin-numbered') {
			words = utils.numberToMark(words)
		}
	}
	return words.join('')
}

const convert = async (text, opts = {}) => {
	const type = await pinyinOrHanzi(text)
	if (type === 'other' || type === 'zhuyin') {
		return text
	}
	if (type === 'mandarin') {
		return hanziToPinyin(text, opts)
	}
	if (type.substr(0, 6) === 'pinyin') {
		return convertPinyin(text, type, opts)
	}
}

module.exports = convert
module.exports.init = hanziToPinyin.init
