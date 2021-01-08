<script>
	import {
		hideMobileStatistics
	} from './store-main.js'

	const showStatistics = () => {
		hideMobileStatistics.update(val=>val=!val)
	}
</script>


<button class="button statistics-trigger text contrast" on:click={showStatistics}>
	{#if $hideMobileStatistics}
		<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chart-line" class="svg-inline--fa fa-chart-line fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z"></path></svg>
	{:else}
		<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
	{/if}
</button>

<style>
	.statistics-trigger {
		border-radius: 8px;
		border: 0;
		outline: 0;
		cursor: pointer;
		overflow: hidden;
		height: 44px;
		width: 44px;
		padding: 10px;
		color: var(--textPrimary);
		background-color: var(--textContrast);
	}
	svg {
		color: #FFF;
	}
	.statistics-trigger:hover {
		box-shadow: 0px 1px 2px #ddd;
	}
</style>