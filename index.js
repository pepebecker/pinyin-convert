'use strict'

const hanziToPinyin = require('hanzi-to-pinyin')
const splitPinyin = require('pinyin-split')
const pinyinOrHanzi = require('pinyin-or-hanzi')
const utils = require('pinyin-utils')

const convert = (text, options = {}) => new Promise((yay, nay) => {
	pinyinOrHanzi(text).then((type) => {
		if (type === 1) {
			hanziToPinyin(text).then((data) => {
				if (options.numbered) {
					let words = data.split(' ')
					words = words.map(utils.markToNumber)
					yay(words.join(' '))
				} else {
					yay(data)
				}
			}, (error) => nay('pinyin-converter -> ' + error))
		}
		if (type === 2 || type === 3) {
			splitPinyin(text, options.keepSpacing).then((words) => {
				if (options.numbered && type !== 3) {
					words = words.map(utils.markToNumber)
				}
				if (options.marked && type !== 2) {
					words = words.map(utils.numberToMark)
				}
				if (!options.numbered && !options.numbered) {
					if (type === 2) {
						words = words.map(utils.markToNumber)
					}
					if (type === 3) {
						words = words.map(utils.numberToMark)
					}
				}
				yay(words.join(options.keepSpacing ? '' : ' '))
			}, (error) => nay('pinyin-converter -> ' + error))
		}
	}, (error) => nay('pinyin-converter -> ' + error))
})

module.exports = convert
