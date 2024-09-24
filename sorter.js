// Select all elements with the class name 'item-card'
const itemCards = document.querySelectorAll('.item-card')

// Initialize an array to hold the extracted data
const cardData = []

// Iterate over each 'item-card' element
itemCards.forEach((itemCard) => {
	// Find the nested element with the class name 'PSEUDOLINK' within the current 'item-card'
	const pseudoLinkElement = itemCard.querySelector('.PSEUDOLINK')

	// If the nested element exists, extract its text content
	if (pseudoLinkElement) {
		const text = pseudoLinkElement.textContent.trim()
		const list = text.split(' ')
		if (list.length) {
			const year = list[0].replace('-', '')
			const cardNumber = list.find((l) => l.startsWith('#'))
			// Store the item card element along with its extracted data
			cardData.push({ itemCard, year, cardNumber, text })
		}
	}
})

// Sort the card data by year and then by card number
cardData.sort((a, b) => {
	if (a.year === b.year) {
		const cardNumberA = a.cardNumber.replace('#', '')
		const cardNumberB = b.cardNumber.replace('#', '')
		return cardNumberA - cardNumberB
	}
	return a.year - b.year
})

// Get the parent element of the item cards
const parentElement = document.querySelector('.item-card').parentElement

// Clear the parent element
parentElement.innerHTML = ''

// Append the sorted item cards back to the parent element
cardData.forEach((card) => {
	parentElement.appendChild(card.itemCard)
})

// Log the sorted texts to the console
console.log(cardData.map((card) => card.text))
console.log('SUCCESSFULLY SORTED ITEMS')
