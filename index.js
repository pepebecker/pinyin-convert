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

const convert = async (text, options = {}) => {
	const type = await pinyinOrHanzi(text)
	if (type === 'other') {
		return text
	}
	if (type === 'mandarin') {
		return convertMandarin(text, options)
	}
	if (type.substr(0, 6) ===  'pinyin') {
		return convertPinyin(text, type, options)
	}
}

module.exports = convert

// convert('我的猫喜欢吃苹果 1')
// .then(data => console.log(JSON.stringify(data)))
// .catch(console.error)

// convert('My cat likes to eat apples: 《我的猫喜欢吃苹果》.')
// .then(data => console.log(JSON.stringify(data)))
// .catch(console.error)

// convert('My cat likes to eat apples: 《我的猫喜欢吃苹果》.', { segmented: true })
// .then(data => console.log(JSON.stringify(data)))
// .catch(console.error)

// convert('wǒ de māo xǐhuan chī píngguǒ')
// .then(data => console.log(JSON.stringify(data)))
// .catch(console.error)

// convert('wǒ de māo xǐhuan chī píngguǒ', { segmented: true })
// .then(data => console.log(JSON.stringify(data)))
// .catch(console.error)
