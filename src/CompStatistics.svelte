<script>
	import { months, loading } from './store-main.js'
	
	import { writable, derived } from 'svelte/store'

	export let device
	
	let monthIndexed = [0,1,2,3,4,5,6,7,8,9,10,11]
	
	let today = new Date()
	let defaultTo = new Date()
	let defaultFrom	= new Date( today.getFullYear(), today.getMonth()-1, today.getDate() )

	let fromYear =  defaultFrom.getFullYear() 
	let fromMonth =  defaultFrom.getMonth() 
	let fromDate =  defaultFrom.getDate() 

	let toYear =  today.getFullYear() 
	let toMonth =  today.getMonth() 
	let toDate =  today.getDate() 


	// Stores
	export const fetchError = writable( false )
	export const statsData = writable( null )
	export const completedOrders = derived(statsData, $statsData=>{
		let result = {
			'weight': 0,
			'orders': 0
		}
		if( $statsData !== null ) {
			let completedOrders = $statsData.completed_orders
			if( completedOrders.length > 0 ) {
				completedOrders.forEach(completedOrder=>{
					result['orders'] ++
					if(completedOrder.items) {
						(completedOrder.items).forEach(item => {
							let weight = parseFloat(item.weight)
							let quantity = item.quantity
							let totalWeight = quantity * weight
							result['weight']+=totalWeight
						})
					}
				})
			}
		}
		result['weight'] = result['weight'].toFixed(1)
		return result
	})

	// Utility functions
	const years = ()=>{
		let today = new Date()
		let currentYear = today.getFullYear()
		let allYears = []
		while(currentYear !== 2015) {
			allYears.push(currentYear)
			currentYear--
		}
		return allYears
	}

	let getDaysOfTheMonth = (year, month) => {
		let days = []
		let day = new Date(year, month, 1)
		// While in the same month -> push day to days
		while (month === day.getMonth()) {
			days.push(new Date(day))
			day.setDate(day.getDate() + 1)
		}
		return days
	}

	const fetchStatistics = async () => {
		loading.update(val=>val=!val)
		let newFromDate = new Date(fromYear, fromMonth, fromDate) 
		newFromDate.setHours(0,0,0,0)
		
		let newToDate = new Date(toYear, toMonth, toDate) 
		newToDate.setHours(0,0,0,0)

		if( newFromDate > newToDate ) {
			console.log('From is higher than two, idiot')
			fetchError.update(val=>val=true)
			loading.update(val=>val=false)
			return
		}

		let newFromDateCopenhagenUTC = new Date(newFromDate.getFullYear(), newFromDate.getMonth(), newFromDate.getDate(), newFromDate.getHours() + 1)
		let newFromISO = newFromDateCopenhagenUTC.toISOString().substring(0, 10)
		
		
		let newToDateCopenhagenUTC = new Date(newToDate.getFullYear(), newToDate.getMonth(), newToDate.getDate(), newToDate.getHours() + 1)
		let newToISO = newToDateCopenhagenUTC.toISOString().substring(0, 10)

		console.log( newFromISO, newToISO )
		let newCall = await fetch(WP_ROUTE_STATS + '?from-date=' +newFromISO+'&to-date='+newToISO)
		let newResponse = await newCall.json()
		try{
			loading.update(val=>val=!val)
			statsData.update(val=>val=newResponse)
			fetchError.update(val=>val=false)
		} catch(error) {
			console.log(error)
		}
	}

	const monthsByNow = () => {
		let months = []
		let today = new Date()
		let highestMonth = today.getMonth() + 1		
		for( let i = 0; i < highestMonth; i++) {
			months.push(i)
		}
		return months
	}

	const daysByNow = () => {
		let days = []
		let today = new Date()
		let highestDay = today.getDate()
		
		for( let i = 1; i <= highestDay; i++) {
			days.push(i)
		}
		return days
	}
</script>

<div class="comp-statistics {device} card">
	<div class="from load-me">
		<span class="title text small contrast">Completed orders between:</span>
		<select name="" id="" bind:value={fromYear}>
			{#each years() as year} 
				{#if year === fromYear}
					<option value={year} selected >{year}</option>
				{:else} 
					<option value={year}>{year}</option>
				{/if} 
			{/each}
		</select>

		<select name="" id="" bind:value={fromMonth}>
			{#each monthIndexed as month}
				{#if month === fromMonth}
					<option value={month} selected >{months[month].title}</option>
				{:else} 
					<option value={month}>{months[month].title}</option>
				{/if} 
			{/each}
		</select>
			
		<select name="" id="" bind:value={fromDate}>
			{#each getDaysOfTheMonth(fromYear, fromMonth) as date}
				{#if date === fromDate}
					<option value={date.getDate()} selected >{date.getDate()}</option>
				{:else} 
					<option value={date.getDate()}>{date.getDate()}</option>
				{/if}
			{/each}
		</select>	
	</div>

	<div class="to load-me">
		<span class="title text small contrast">and</span>

		<select name="" id="" bind:value={toYear}>
			{#each years() as year} 
				{#if year === toYear}
					<option value={year} selected >{year}</option>
				{:else} 
					<option value={year}>{year}</option>
				{/if} 
			{/each}
		</select>

		<select name="" id="" bind:value={toMonth}>
			{#if toYear !== today.getFullYear()}
				{#each monthIndexed as month}
					{#if month === toMonth}
						<option value={month} selected>{months[month].title}</option>
						{:else}
						<option value={month}>{months[month].title}</option>
					{/if}
				{/each}
			{/if}
			{#each monthsByNow() as month} 
				{#if month === toMonth}
					<option value="" selected>{months[month].title}</option>
				{:else} 
					<option value="">{months[month].title}</option>
				{/if} 
			{/each}
		</select>

		<select name="" id="" bind:value={toDate}>
			{#if today.getFullYear() === toYear && today.getMonth() === toMonth }
				{#each daysByNow() as date}
					{#if date === toDate}
						<option value={date} selected>{date}</option>
					{:else}
						<option value={date}>{date}</option>
					{/if}
				{/each}
			{:else}
				{#each getDaysOfTheMonth(toYear, toMonth) as date}
					{#if date === toDate}
						<option value={date.getDate()} selected >{date.getDate()}</option>
					{:else} 
						<option value={date.getDate()}>{date.getDate()}</option>
					{/if}
				{/each}
			{/if}
		</select>
	</div>

	<button class="load-me button primary update-stats" on:click={fetchStatistics}>Update statistics</button>
	
	<div class="load-me stats-results">
		{#if $fetchError}
			<div class="error-message">
				<span class="text error">The inputted date pair is invalid.</span>
			</div>
		{/if}
		{#if $statsData !== null}
			<div class="kilos">
				<span class="text center small contrast">Kilos sold</span>
				<p class="text center large">{$completedOrders.weight}</p>
			</div>
			<div class="orders">
				<span class="text center small contrast">Orders</span>
				<p class="text center large">{$completedOrders.orders}</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.comp-statistics.desktop {
		display: none;
	}
	.error-message {
		grid-column: 1/3;
	}
	@media screen and (min-width: 46.8em) {
		.comp-statistics.mobile {
			display: none;
		}
		.comp-statistics.desktop {
			display: grid;
			align-items: center;
			align-content: center;
			grid-gap: 1rem;
			padding: 1rem;
		}
		.comp-statistics.desktop .stats-results {
			display: grid;
			grid-template-columns: 1fr 1fr;
			justify-content: center;
			justify-items: center;
		}
		.comp-statistics.desktop .from,
		.comp-statistics.desktop .to {
			display: grid;
			align-items: center;
			align-content: center;
			grid-template-columns: 1fr 2fr 1fr;
			grid-gap: 10px;
		}
		.comp-statistics.desktop .from .title,
		.comp-statistics.desktop .to .title {
			grid-column: 1/4;
		}
		.comp-statistics.desktop select {
			height: 34px;
			background-color: #FFF;
		}
		.comp-statistics.desktop button {
			max-height: 45px;
		}
	}

	.comp-statistics.mobile {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 400px;
		width: 300px;
		display: grid;
		align-items: center;
		align-content: center;
		grid-gap: 1rem;
		padding: 1rem;
	}
	.comp-statistics.mobile .stats-results {
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-content: center;
		justify-items: center;
	}
	.comp-statistics.mobile .from,
	.comp-statistics.mobile .to {
		display: grid;
		align-items: center;
		align-content: center;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 10px;
	}
	.comp-statistics.mobile .from .title,
	.comp-statistics.mobile .to .title {
		grid-column: 1/4;
	}
	.comp-statistics.mobile select {
		height: 34px;
		background-color: #FFF;
	}
	.comp-statistics.mobile button {
		max-height: 45px;
	}

</style>