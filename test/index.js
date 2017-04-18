'use strict'

const convert = require('../index')
const so = require('so')

so(function*(){
	yield convert('我的猫喜欢喝牛奶').then((data) => {
		console.log('Test 1:', data)
	}, (error) => console.log('Test 1:', error))

	yield convert('wǒ de māo xǐhuān hē niúnǎi', {keepSpacing: true}).then((data) => {
		console.log('Test 2:', data)
	}, (error) => console.log('Test 2:', error))

	yield convert('wo3 de mao1 xi3huan1 he1 niu2nai3', {keepSpacing: true}).then((data) => {
		console.log('Test 3:', data)
	}, (error) => console.log('Test 3:', error))

	yield convert('lü4se4', {keepSpacing: true}).then((data) => {
		console.log('Test 4:', data)
	}, (error) => console.log('Test 4:', error))

	convert('wodemaoxihuan').then((data) => {
		console.log('Test 5:', data)
	}, (error) => console.log('Test 5:', error))
})()