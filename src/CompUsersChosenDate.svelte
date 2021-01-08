<script>
	import {
		dateOfRoasting,
		weekdays,
		months
	} from './store-main.js'

	let monthOfRoasting = months[$dateOfRoasting.getMonth()].title
	let weekdayOfRoasting = weekdays[$dateOfRoasting.getDay()].title
	
</script>

<div class="comp-users-chosen-date card load-me">
	<p class="text small">You'r chosen date is</p>
	<div class="column">
		<p class="text">{weekdayOfRoasting} {$dateOfRoasting.getDate()} {monthOfRoasting} {$dateOfRoasting.getFullYear()}</p>
	</div>
</div>

<style>
	.comp-users-chosen-date {
		margin-bottom: 1rem;
		padding: 1rem;
		display: grid;
		grid-gap: 1rem;
	}

</style>