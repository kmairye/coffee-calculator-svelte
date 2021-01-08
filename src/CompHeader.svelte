<script>
	import User from './CompUser.svelte'
	import ToggleCalendar from './CompToggleCalendar.svelte'
	import SignOut from './CompSignOut.svelte'
	
</script>

<header class="max">
	<div class="welcome">
		<User />
	</div>
	<div class="navigation">
		<SignOut />
		<!-- <ToggleCalendar /> -->
	</div>
</header>



<style>
	header {
		display: grid;
		align-items: center;
		align-content: center;
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 3rem;
	}
	.navigation {
		display: none;
	}
	

	@media screen and (min-width: 46.8em){
		header {
			grid-template-columns: 5fr 1fr;
			padding-top: 4rem;
		}
		.navigation {
			display: grid;
			grid-template-columns: 1fr;
			align-items: center;
			align-content: center;
			justify-content: flex-end;
			justify-items: flex-end;
			grid-gap: 1rem;
		}
	}
	@media screen and (min-width: 50em){
		header {
			grid-template-columns: 8fr 1fr;
		}
	}

</style>