'use strict'

const hanziToPinyin = require('hanzi-to-pinyin')
const splitPinyin = require('pinyin-split')
const pinyinOrHanzi = require('pinyin-or-hanzi')
const utils = require('pinyin-utils')

const convertMandarin = async (text, options = {}) => {
	const data = await hanziToPinyin(text, options.numbered)
	return data.reduce((list, token, i) => {
		if (typeof token === 'string') {
			if (typeof list[list.length - 1] === 'string') {
				list[list.length - 1] += token
			} else {
				list.push(token)
			}
		} else {
			token = token.map(w => options.segmented ? w.replace(/\s/g, '') : w)
			if (token.length === 1) {
				if (typeof data[i - 1] === 'string') {
					list[list.length - 1] += token[0]
				} else if (typeof list[list.length - 1] === 'string') {
					list[list.length - 1] += ' ' + token[0]
				} else {
					list.push((i > 0 ? ' ' : '') + token[0])
				}
			} else {
				if (i === 0 || typeof list[list.length - 1] === 'string') {
					if (typeof data[i - 1] !== 'string')
						list[list.length - 1] += ' '
					list.push(token)
				} else [
					list.push(' ', token)
				]
			}
		}
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

convert('我的猫喜欢喝牛奶"', { segmented: true })
.then(data => console.log(data))
.catch(console.error)
