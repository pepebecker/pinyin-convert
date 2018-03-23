'use strict'

const hanziToPinyin = require('hanzi-to-pinyin')
const splitPinyin = require('pinyin-split')
const pinyinOrHanzi = require('pinyin-or-hanzi')
const utils = require('pinyin-utils')

const convertPinyin = async (text, type, opts) => {
	let words = splitPinyin(text, opts.everything)
	if (opts.numbered && type !== 'pinyin-numbered') {
		if (opts.everything) {
			words = words.map(word => typeof word !== 'string' ? utils.markToNumber(word, false) : word)
		} else {
			words = utils.markToNumber(words, false)
		}
	}
	else if (opts.marked && type !== 'pinyin-marked') {
		if (opts.everything) {
			words = words.map(word => typeof word !== 'string' ? utils.numberToMark(word) : word)
		} else {
			words = utils.numberToMark(words)
		}
	}
	else if (!opts.numbered) {
		if (type === 'pinyin-marked') {
			if (opts.everything) {
				words = words.map(word => typeof word !== 'string' ? utils.markToNumber(word, false) : word)
			} else {
				words = utils.markToNumber(words, false)
			}
		}
		if (type === 'pinyin-numbered') {
			if (opts.everything) {
				words = words.map(word => typeof word !== 'string' ? utils.numberToMark(word) : word)
			} else {
				words = utils.numberToMark(words)
			}
		}
	}
	return words.join(opts.everything ? '' : ' ')
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
