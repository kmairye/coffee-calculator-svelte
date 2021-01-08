<div class="comp-splash-screen">
	<div class="splash-message">
		<h1 class="text center">Coffee Calculator</h1>
		<p class="text large center">Brewing data</p>
		<div class="spinner">
			<div class="square"></div>
		</div>
	</div>
</div>

<style>

	.comp-splash-screen {
		background-color: var(--textContrast);
		color: #FFF;

		height: 100vh;
		width: 100vw;

		display: grid;
		justify-content: center;
		align-items: center;
	}
	.splash-message {
		display: grid;
		justify-content: center;
		justify-items: center; 
	}
	.spinner {
		margin-top: 2rem;
		height: 50px;
		width: 50px;
		display: grid;
		justify-content: center;
		align-content: center;
	}
	.spinner .square {
		height: 20px;
		width: 20px;
		background-color: #FFF;
		animation-name: spinner;
		animation-duration: 1s;
		animation-timing-function: cubic-bezier(0.65, 0.54, 0.54, 1);
		animation-iteration-count: infinite;
	}
	@keyframes spinner {
		0% { transform: rotate(0deg) }
		100% { transform: rotate(360deg) }
	}

</style>