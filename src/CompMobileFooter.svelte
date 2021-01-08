<script>
	import ToggleStatistics from './CompToggleStatistics.svelte'
	import ToggleCalendar from './CompToggleCalendar.svelte'
	import SignOut from './CompSignOut.svelte'
</script>

<footer class="max">
	<div class="navigation">
	<div class="column justify-start">
		<SignOut />
	</div>
	<div class="column justify-end">
		<ToggleStatistics  />
		<ToggleCalendar />
	</div>
	</div>
</footer>

<style>
	footer {
		padding: 1rem;
		position: fixed;
		bottom: 0;
		width: 100%;
	}
	footer .navigation {
		display: grid;
		align-items: center;
		align-content: center;
		grid-template-columns: 1fr 1fr;
	}
	.navigation .column.justify-end {
		display: grid;
		justify-content: flex-end;
		justify-items: flex-end;
	}


	@media screen and (min-width: 46.8em) {
		footer, .navigation {
			display: none;
		}
	}
</style>