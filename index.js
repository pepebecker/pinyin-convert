'use strict'

const hanziToPinyin = require('hanzi-to-pinyin')
const splitPinyin = require('pinyin-split')
const pinyinOrHanzi = require('pinyin-or-hanzi')
const utils = require('pinyin-utils')

const convert = async (text, options = {}) => {
	const type = await pinyinOrHanzi(text)
	if (type === 'other') {
		return text
	}
	if (type === 'mandarin') {
		let data = await hanziToPinyin(text, options.numbered)
		data = data.map(words => {
			return words.map(word => options.segmented ? word.replace(/\s*/g, '') : word)
		})
		return data.map(words => words[0]).join(' ')
	}
	if (type.substr(0, 6) ===  'pinyin') {
		options.keepSpaces = options.segmented
		let words = await splitPinyin(text, options)
		if (options.numbered && type !== 'pinyin-numbered') {
			words = utils.markToNumber(words)
		}
		else if (options.marked && type !== 'pinyin-marked') {
			words = utils.numberToMark(words)
		}
		else if (!options.numbered && !options.numbered) {
			if (type === 'pinyin-marked') {
				words = utils.markToNumber(words)
			}
			if (type === 'pinyin-numbered') {
				words = utils.numberToMark(words)
			}
		}
		return words.join(options.segmented ? '' : ' ')
	}
}

module.exports = convert
