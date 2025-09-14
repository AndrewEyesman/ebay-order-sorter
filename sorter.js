/********************************************/
/*********** SORT ITEMS BY TITLE ************/
/********************************************/

const itemCards = document.querySelectorAll('.item-card')
const cardData = []

itemCards.forEach((itemCard) => {
	const pseudoLinkElement = itemCard.querySelector('.PSEUDOLINK')

	if (pseudoLinkElement) {
		const text = pseudoLinkElement.textContent.trim()
		const list = text.split(' ')
		if (list.length) {
			const year = list[0].replace('-', '')
			const cardNumber = list.find((l) => l.startsWith('#'))
			cardData.push({ itemCard, year, cardNumber, text })
		}
	}
})

cardData.sort((a, b) => {
	if (a.year === b.year) {
		const cardNumberA = a.cardNumber.replace('#', '')
		const cardNumberB = b.cardNumber.replace('#', '')
		return cardNumberA - cardNumberB
	}
	return a.year - b.year
})

const parentElement = document.querySelector('.item-card').parentElement

parentElement.innerHTML = ''

cardData.forEach((card) => {
	parentElement.appendChild(card.itemCard)
})

console.log(cardData.map((card) => card.text))
console.log('✅ SUCCESSFULLY SORTED ITEMS BY TITLE')

/********************************************/
/************ SORT ITEMS BY SKU *************/
/********************************************/

const itemCards2 = document.querySelectorAll('.item-card')
const cardData2 = []

itemCards2.forEach((itemCard) => {
	const skuElement = itemCard.querySelector('.lineItemCardInfo__sku')?.lastElementChild

	if (skuElement) {
		const sku = skuElement.textContent.trim()
		cardData2.push({ itemCard, sku })
	} else {
		cardData2.push({ itemCard, sku: 'ZZZ_NO_SKU' })
	}
})

const letterSuffixRegex = /-[a-zA-Z]+$/

cardData2.sort((a, b) => {
	const aHasLetterSuffix = letterSuffixRegex.test(a.sku)
	const bHasLetterSuffix = letterSuffixRegex.test(b.sku)

	if (aHasLetterSuffix && !bHasLetterSuffix) {
		return 1
	}
	if (!aHasLetterSuffix && bHasLetterSuffix) {
		return -1
	}

	return a.sku.localeCompare(b.sku, undefined, { numeric: true })
})

if (itemCards2.length > 0) {
	const parentElement = itemCards2[0].parentElement

	parentElement.innerHTML = ''

	cardData2.forEach((card) => {
		parentElement.appendChild(card.itemCard)
	})

	console.log(cardData2.map((card) => card.sku))
	console.log('✅ SUCCESSFULLY SORTED ITEMS BY SKU')
}
