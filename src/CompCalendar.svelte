<script>
	import {
	dateOfRoasting,
	calcData,
	months, 
	weekdays, 
	loading,
	hideMobileCalendar
	} from './store-main.js'
	
	export let device
	
	let monthOfRoasting = $dateOfRoasting.getMonth()
	let yearOfRoasting = $dateOfRoasting.getFullYear()
	let today = new Date()
	today.setHours(0,0,0,0)

	let allDatesByMonth = (year, month) => {
		let days = []
		let day = new Date(year, month, 1)
		// While in the same month -> push day to days
		while (month === day.getMonth()) {
			days.push(new Date(day))
			day.setDate(day.getDate() + 1)
		}
		return days
	}

	const changeDateOfRoasting = (newDay) => {
		
		dateOfRoasting.set(newDay)
		getDataByDate($dateOfRoasting)
	}

	const getDataByDate = async (date) => {
		loading.update(val=>val=!val)

		// UTC Copenhagen +1
		let dateCopenhagenUTC = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 1)
		let isoDate = dateCopenhagenUTC.toISOString().substring(0, 10)
		let newCall = await fetch(WP_ROUTE_CALC + `?date=${isoDate}`)
		let newResponse = await newCall.json()
		try{
			calcData.update( (val) => val = newResponse )
			loading.update(val=>val=!val)
		} catch(error){
			console.log('error: ', error)
		}
	}

	const previousMonth = () => {
		if (monthOfRoasting === 0) {
			monthOfRoasting = 11
			yearOfRoasting--
		} else {
			monthOfRoasting--
		}
	}

	const nextMonth = () => {
		if (monthOfRoasting === 11) {
			monthOfRoasting = 0
			yearOfRoasting++
		} else {
			monthOfRoasting++
		}
	}
</script>


{#if device === 'desktop'}

	<div class="comp-desktop-calendar comp-calendar card">
		<div class="chosen-date">
			<span class="text large contrast">{weekdays[$dateOfRoasting.getDay()].abbr}</span>
			<span class="text xlarge">{$dateOfRoasting.getDate()}</span>
		</div>
		<div class="month-nav">
			<button class="button text light" on:click={previousMonth}>
				<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" class="svg-inline--fa fa-chevron-left fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg>
			</button>
			<p class="text center">{ months[monthOfRoasting].title } { yearOfRoasting }</p>
			<button class="button text light" on:click={nextMonth}>
				<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" class="svg-inline--fa fa-chevron-right fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>
			</button>
		</div>
		<div class="monthly-dates">
			<div class="explainer text small light center uppercase" data-weekday="1">
				{ weekdays[1].abbr }
			</div>
			<div class="explainer text small light center uppercase" data-weekday="2">
				{ weekdays[2].abbr }
			</div>
			<div class="explainer text small light center uppercase" data-weekday="3">
				{ weekdays[3].abbr }
			</div>
			<div class="explainer text small light center uppercase" data-weekday="4">
				{ weekdays[4].abbr }
			</div>
			<div class="explainer text small light center uppercase" data-weekday="5">
				{ weekdays[5].abbr }
			</div>
			<div class="explainer text small light center uppercase" data-weekday="6">
				{ weekdays[6].abbr }
			</div>
			<div class="explainer text small light center uppercase" data-weekday="0">
				{ weekdays[0].abbr }
			</div>

			{#each allDatesByMonth(yearOfRoasting, monthOfRoasting) as day}
				<div on:click={changeDateOfRoasting(day)} class="numeric-date text small center pointer { day.getDate() === $dateOfRoasting.getDate() && day.getMonth() === $dateOfRoasting.getMonth() && day.getFullYear() === $dateOfRoasting.getFullYear() ? 'selected' : ''} { day.getDate() === today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === today.getFullYear() ? 'today' : ''}" data-weekday={day.getDay()} data-date={day.getDate()} data-month={day.getMonth()} data-year={day.getFullYear()}>
					<div class="inner">
						{ day.getDate() }
					</div>
				</div>
			{/each}
		</div>
	</div>
{:else if device === 'mobile'}
	<div class="comp-mobile-calendar comp-calendar card">
		<div class="chosen-date">
			<span class="text large contrast">{weekdays[$dateOfRoasting.getDay()].abbr}</span>
			<span class="text xlarge">{$dateOfRoasting.getDate()}</span>
		</div>
		<div class="month-nav">
			<button class="button text light" on:click={previousMonth}>
				<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" class="svg-inline--fa fa-chevron-left fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg>
			</button>
			<p class="text center">{ months[monthOfRoasting].title } { yearOfRoasting }</p>
			<button class="button text light" on:click={nextMonth}>
				<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" class="svg-inline--fa fa-chevron-right fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>
			</button>
		</div>
		<div class="monthly-dates">
			<div class="explainer text small light center uppercase" data-weekday="1">
				{ weekdays[1].abbr }
			</div>
			<div class="explainer text small light center uppercase" data-weekday="2">
				{ weekdays[2].abbr }
			</div>
			<div class="explainer text small light center uppercase" data-weekday="3">
				{ weekdays[3].abbr }
			</div>
			<div class="explainer text small light center uppercase" data-weekday="4">
				{ weekdays[4].abbr }
			</div>
			<div class="explainer text small light center uppercase" data-weekday="5">
				{ weekdays[5].abbr }
			</div>
			<div class="explainer text small light center uppercase" data-weekday="6">
				{ weekdays[6].abbr }
			</div>
			<div class="explainer text small light center uppercase" data-weekday="0">
				{ weekdays[0].abbr }
			</div>
			{#each allDatesByMonth(yearOfRoasting, monthOfRoasting) as day}
				<div on:click={changeDateOfRoasting(day)} class="numeric-date text small center pointer { day.getDate() === $dateOfRoasting.getDate() && day.getMonth() === $dateOfRoasting.getMonth() && day.getFullYear() === $dateOfRoasting.getFullYear() ? 'selected' : ''} { day.getDate() === today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === today.getFullYear() ? 'today' : ''}" data-weekday={day.getDay()} data-date={day.getDate()} data-month={day.getMonth()} data-year={day.getFullYear()}>
					<div class="inner">
						{ day.getDate() }
					</div>
				</div>
			{/each}
		</div>
	</div>	
{/if}


<style>
	.comp-desktop-calendar {
		display: none;
	}
	@media screen and (min-width: 46.8em) {
		.comp-desktop-calendar {
			display: grid;
			grid-template-rows: 3fr 1fr 4fr;
			align-content: center;
			align-items: center;
			padding: 1rem;
			max-width: 300px;
			margin-bottom: 1rem;
		}
	}
	.comp-mobile-calendar {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 400px;
		width: 300px;
		
		display: grid;
		grid-template-rows: 3fr 1fr 4fr;
		align-content: center;
		align-items: center;
		padding: 1rem;
	}
	.chosen-date {
		display: grid;
		grid-template-rows: 1fr 2fr;
		justify-content: center;
		justify-items: center; 
	}
	.month-nav {
		display: grid;
		align-items: center;
		grid-template-columns: 1fr 8fr 1fr;
	}
	.monthly-dates {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		align-items: center;
	}
	.explainer,
	.numeric-date .inner {
		padding-top: 5px;
		padding-bottom: 5px;
		display: grid;
		justify-content: center;
		align-items: center;
	}
	.numeric-date.today {
		background-color: #EEE;
	}
	.numeric-date:hover {
		background-color: var(--textContrastLight);
	}
	.numeric-date.selected {
		background-color: var(--textContrast);
	}
	.numeric-date.selected:hover {
		background-color: var(--textContrast);
	}
	.explainer[data-weekday="1"],
	.numeric-date[data-weekday="1"] {
		grid-column-start: 1; 
	}
	.explainer[data-weekday="2"],
	.numeric-date[data-weekday="2"] {
		grid-column-start: 2; 
	}
	.explainer[data-weekday="3"],
	.numeric-date[data-weekday="3"] {
		grid-column-start: 3; 
	}
	.explainer[data-weekday="4"],
	.numeric-date[data-weekday="4"] {
		grid-column-start: 4; 
	}
	.explainer[data-weekday="5"],
	.numeric-date[data-weekday="5"] {
		grid-column-start: 5; 
	}
	.explainer[data-weekday="6"],
	.numeric-date[data-weekday="6"] {
		grid-column-start: 6; 
	}
	.explainer[data-weekday="0"],
	.numeric-date[data-weekday="0"] {
		grid-column-start: 7; 
	}
</style>