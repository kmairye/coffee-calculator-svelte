<script>
	import {
		calcData,
		dateOfRoasting,
		coffeeKilos
		} from './store-main.js'
		import { user } from './store-firebase.js'

		let total = $coffeeKilos.Brasil + $coffeeKilos.Colombia
</script>


<div class="comp-coffee-kilos max">
	<div class="card total total-brasil load-me">
		<span class="text center small  contrast">Brasil</span>
		<p class="text center large">{$coffeeKilos.Brasil}</p>
		<span class="text center small">kg</span>
	</div>
	<div class="card total total-colombia load-me">
		<span class="text center small  contrast">Colombia</span>
		<p class="text center large">{$coffeeKilos.Colombia}</p>
		<span class="text center small">kg</span>
	</div>
	<div class="card total total-all load-me">
		<span class="text center small contrast">Total</span>
		<p class="text center large">{$coffeeKilos.Total}</p>
		<span class="text center small">kg</span>
	</div>
</div>

<style>
	.comp-coffee-kilos {
		border-radius: 8px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 1rem;
		margin-bottom: 1rem;
	}
	.total {
		padding-top: 1.5rem;
		padding-bottom: 1.5rem;
		display: grid;
		justify-content: center;
		align-items: center;
		grid-template-rows: 1fr 6fr 1fr;
	}
	.text.large {
		font-size: 2rem;
	}
	@media screen and (min-width: 24em) {
		.text.large {
			font-size: 3rem;
		}
	}
</style>