'use strict'

const hanziToPinyin = require('hanzi-to-pinyin')
const splitPinyin = require('pinyin-split')
const pinyinOrHanzi = require('pinyin-or-hanzi')
const utils = require('pinyin-utils')

const convertMandarin = async (text, options = {}) => {
	let lastType = null
	return (await hanziToPinyin(text, options.numbered)).reduce((list, token) => {
		const lastIndex = list.length - 1
		if (typeof token === 'string') { // token is a string
			if (typeof list[lastIndex] === 'string') {
				list[lastIndex] += token
			} else {
				list.push(token)
			}
		} else if (token.length === 1) { // token is one word
			const word = options.segmented ? token[0].replace(/\s/g, '') : token[0]
			if (typeof list[lastIndex] === 'string') {
				if (lastType !== 'string') {
					list[lastIndex] += ' '
				}
				list[lastIndex] += word
			} else {
				if (list.length === 0) {
					list.push(word)
				} else {
					list.push(' ' + word) // add space after token
				}
			}
		} else { // token has multiple pinyins
			if (typeof list[lastIndex] === 'string') {
				list[lastIndex] += ' ' // add space before token
			}
			list.push(token)
		}
		lastType = typeof token
		return list
	}, [])
}

const convertPinyin = async (text, type, options) => {
	let words = splitPinyin(text, options.everything)
	if (options.numbered && type !== 'pinyin-numbered') {
		if (options.everything) {
			words = words.map(word => typeof word !== 'string' ? utils.markToNumber(word, false) : word)
		} else {
			words = utils.markToNumber(words, false)
		}
	}
	else if (options.marked && type !== 'pinyin-marked') {
		if (options.everything) {
			words = words.map(word => typeof word !== 'string' ? utils.numberToMark(word) : word)
		} else {
			words = utils.numberToMark(words)
		}
	}
	else if (!options.numbered) {
		if (type === 'pinyin-marked') {
			if (options.everything) {
				words = words.map(word => typeof word !== 'string' ? utils.markToNumber(word, false) : word)
			} else {
				words = utils.markToNumber(words, false)
			}
		}
		if (type === 'pinyin-numbered') {
			if (options.everything) {
				words = words.map(word => typeof word !== 'string' ? utils.numberToMark(word) : word)
			} else {
				words = utils.numberToMark(words)
			}
		}
	}
	return words.join(options.everything ? '' : ' ')
}

const convert = async (text, options = {}) => {
	const type = await pinyinOrHanzi(text)
	if (type === 'other' || type === 'zhuyin') {
		return text
	}
	if (type === 'mandarin') {
		return convertMandarin(text, options)
	}
	if (type.substr(0, 6) === 'pinyin') {
		return convertPinyin(text, type, options)
	}
}

module.exports = convert
