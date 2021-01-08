<script>
	import {
		calcData,
		hideMobileCalendar,
		hideMobileStatistics,
		loading
	} from './store-main.js'
	import { user } from './store-firebase.js'
	import Header from './CompHeader.svelte'
	import SignIn from './CompSignIn.svelte'
	import SplashScreen from './CompSplashScreen.svelte'
	import ToggleCalendar from './CompToggleCalendar.svelte'
	import Calendar from './CompCalendar.svelte'
	import CoffeeKilos from './CompCoffeeKilos.svelte'
	import CoffeePackages from './CompCoffeePackages.svelte'
	import Statistics from './CompStatistics.svelte'
	import User from './CompUser.svelte'
	import UsersChosenDate from './CompUsersChosenDate.svelte'
	import MobileFooter from './CompMobileFooter.svelte'
	
	import { onMount } from 'svelte'

	onMount(async()=>{
		let call = await fetch(WP_ROUTE_CALC)
		let response = await call.json()
		try {
			calcData.update( (val) => val = response )
		} catch(error){
			console.log(error)
		}
	})

	const checkScreenWidth = ()=>{
		let screenWidth = window.innerWidth;
		return screenWidth
	}

	let deferredPrompt;

</script>

	{#if $calcData !== null}
			{#if $user !== null}
			<Header />
			<main class="max {$loading ? 'loading' : undefined} ">
				<div class="column column-user-chosen-date">
					<UsersChosenDate />
				</div>
				<div class="column">
					<Calendar device='desktop' />
					<Statistics device='desktop' />
				</div>
				<div class="column">
					<CoffeeKilos />
					<CoffeePackages />
				</div>
				<div class="column column-statistics">
				</div>
				{#if !$hideMobileCalendar}
					<Calendar device='mobile' />
				{/if}
				{#if !$hideMobileStatistics}
					<Statistics device='mobile' />
				{/if}
			</main>
				<MobileFooter />
			{:else}
				<SignIn />
			{/if}
	{:else}
		<SplashScreen />
	{/if}

<style>
	main {
		padding-top: 1rem;
		padding-bottom: 80px;
		box-sizing: border-box;
		padding-left: 1rem;
		padding-right: 1rem;
	}
	@media only screen and (min-width: 46.8em) {
		main {
			padding-top: 2rem;
			display: grid;
			grid-template-columns: 1fr 3fr;
			grid-gap: 1rem;
		}
		.column-user-chosen-date {
			display: none;
			grid-column: 1/3;
		}
		.column-statistics {
			grid-column: 1/3;
		}
	}

</style>