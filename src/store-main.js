import {
	writable,
	derived
} from 'svelte/store'


// #################### API DATA ####################
export const calcData = writable(null)

export const coffeeKilos = derived(calcData, ($calcData) => {
	let result = {'Brasil': 0,'Colombia': 0,'Total': 0}
	if ($calcData !== null) {
		let allOrders = $calcData.processing_orders
		let subscriptions = $calcData.renewing_subscriptions
		if( subscriptions.length > 0 ) {
			allOrders = allOrders.concat(subscriptions)
		}
		allOrders.forEach(order=>{
			(order.items).forEach(item=>{
				let weight = parseFloat(item.weight)
				if( weight > 1 ) {
					result[item.type] += weight
					result['Total'] += weight
				} else {
					result[item.type] += (weight * item.quantity)
					result['Total'] += (weight * item.quantity)
				}
			})
		})
	}
	result['Brasil'] = result['Brasil'].toFixed(1)
	result['Colombia'] = result['Colombia'].toFixed(1)
	result['Total'] = result['Total'].toFixed(1)
	return result
})

export const coffeePackages = derived(calcData, ($calcData) => {

	let result = {
		"col200": {"ground-for-espresso": 0, "whole-beans": 0, "ground-for-filter": 0, "ground-for-french-press": 0, "ground-for-pour-over": 0},
		"col450": {"ground-for-espresso": 0, "whole-beans": 0, "ground-for-filter": 0, "ground-for-french-press": 0, "ground-for-pour-over": 0},
		"col750": {"ground-for-espresso": 0, "whole-beans": 0, "ground-for-filter": 0, "ground-for-french-press": 0, "ground-for-pour-over": 0},
		"col1000": {"ground-for-espresso": 0, "whole-beans": 0, "ground-for-filter": 0, "ground-for-french-press": 0, "ground-for-pour-over": 0},
		"bra200": {"ground-for-espresso": 0, "whole-beans": 0, "ground-for-filter": 0, "ground-for-french-press": 0, "ground-for-pour-over": 0},
		"bra450": {"ground-for-espresso": 0, "whole-beans": 0, "ground-for-filter": 0, "ground-for-french-press": 0, "ground-for-pour-over": 0},
		"bra750": {"ground-for-espresso": 0, "whole-beans": 0, "ground-for-filter": 0, "ground-for-french-press": 0, "ground-for-pour-over": 0},
		"bra1000": {"ground-for-espresso": 0, "whole-beans": 0, "ground-for-filter": 0, "ground-for-french-press": 0, "ground-for-pour-over": 0},
	}

	if( $calcData !== null ) {
		let allOrders = $calcData.processing_orders
		let subscriptions = $calcData.renewing_subscriptions

		if( subscriptions.length > 0 ) {
			allOrders = allOrders.concat(subscriptions)
		}

		allOrders.forEach(order=>{
			(order.items).forEach(item=>{
				let sku = (item.sku).toLowerCase()
				let quantity = item.quantity
				let weight = parseFloat(item.weight)
				let prepType = item.preparation_type ? item.preparation_type : 'whole-beans' 
				let customerType = item.customer_type ? item.customer_type : 'D2C' 
				
				if( customerType === 'B2B' ) {
					if( weight >= 1 ) {
						quantity = quantity * weight
					}
					if( item.type === 'Colombia' ) {
						sku = 'col1000'
					}
					if( item.type === 'Brasil' ) {
						sku = 'bra1000'
					}
				} else {
					let cut = sku.indexOf('/')
					if( cut ) {
						sku = sku.substr(0, cut)
					}
				}
				result[sku][prepType] += quantity
			})
		})

	}

	return result
})

export const dateOfRoasting = writable(new Date())

// #################### Utility ####################
export const hideMobileCalendar = writable(true)
export const hideMobileStatistics = writable(true)

// Prettify month names and abbrivations
export const months = {
	0: {"title": "January","abbr": "Jan"},
	1: {"title": "February","abbr": "Feb"},
	2: {"title": "March","abbr": "Mar"},
	3: {"title": "April","abbr": "Apr"},
	4: {"title": "May","abbr": "May"},
	5: {"title": "June","abbr": "Jun"},
	6: {"title": "July","abbr": "Jul"},
	7: {"title": "August","abbr": "Aug"},
	8: {"title": "September","abbr": "Sep"},
	9: {"title": "October","abbr": "Oct"},
	10: {"title": "November","abbr": "Nov"},
	11: {"title": "December","abbr": "Dec"},
}

// Prettify weekday names and abbrivations
export const weekdays = {
	0: {"title": "Sunday","abbr": "Sun"},
	1: {"title": "Monday","abbr": "Mon"},
	2: {"title": "Tuesday","abbr": "Tue"},
	3: {"title": "Wednesday","abbr": "Wed"},
	4: {"title": "Thursday","abbr": "Thu"},
	5: {"title": "Friday","abbr": "Fri"},
	6: {"title": "Saturday","abbr": "Sat"}
}

// Loading
export const loading = writable(false)

// Coffee information prettifier
export const preparationPretty = {
	"ground-for-espresso": {"title": "Ground for Espresso","abbr": "Espresso"},
	"whole-beans": {"title": "Whole Beans","abbr": "Beans"},
	"ground-for-filter": {"title": "Ground for Filter","abbr": "Filter"},
	"ground-for-french-press": {"title": "Ground for French Press","abbr": "French"},
	"ground-for-pour-over": {"title": "Ground for Pour Over","abbr": "Pour"},
}

// SKU numbers
export const skuNumbers = ["bra200","bra450","bra750","bra1000","col200","col450","col750","col1000"]

// Coffee preparation types
export const preparationTypes = ["ground-for-espresso","whole-beans","ground-for-filter","ground-for-french-press","ground-for-pour-over"]