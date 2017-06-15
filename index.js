'use strict'

const hanziToPinyin = require('hanzi-to-pinyin')
const splitPinyin = require('pinyin-split')
const pinyinOrHanzi = require('pinyin-or-hanzi')
const utils = require('pinyin-utils')

const convert = (text, options = {}) => new Promise((yay, nay) => {
	pinyinOrHanzi(text).then((type) => {
		if (type === 0) {
			yay(text)
		}
		if (type === 1) {
			hanziToPinyin(text).then((data) => {
				if (options.numbered) {
					let words = data.split(' ')
					words = words.map(utils.markToNumber)
					yay(words.join(' '))
				} else {
					yay(data)
				}
			}).catch(nay)
		}
		if (type === 2 || type === 3) {
			splitPinyin(text, options).then((words) => {
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
				yay(words.join(options.keepSpaces ? '' : ' '))
			}).catch(nay)
		}
	}).catch(nay)
})

module.exports = convert
