<script>
	import { auth, user, db } from './store-firebase.js'
	import { writable } from 'svelte/store'

	let email
	let password
	let firstname
	let lastname
	let lostPassword = writable(false)
	let haveNoProfile = writable(false)
	let resetLinkSent = writable(false)
	let errorMessage = writable(null)

	const signIn = async(email, password) => {
		try {
			auth.signInWithEmailAndPassword(
				email,
				password
				).then( (user) => {
					errorMessage !== '' ? errorMessage.update( (val) => val = '' ) : undefined
				} )
		} catch (error) {
			errorMessage.update( (val) => val = {'code': error.code, 'message': error.message} )
		}

	}

	const sendResetPasswordEmail = (email) => {
		try {
			auth.sendPasswordResetEmail(email)
			resetLinkSent.update(val=>val=true)
		} catch (error) {
			errorMessage.update( (val) => val = {'code': error.code, 'message': error.message} )
		}

	}

	const lostMyPassword = () => {
		errorMessage.update(val=>val=null)
		lostPassword.update(val=>val=!val)
	}

	const noProfile = () => {
		errorMessage.update(val=>val=null)
		haveNoProfile.update(val=>val=!val)
	}

	async function signUp(email, password) {
		try {
			auth.createUserWithEmailAndPassword(email, password)
			.then((user)=>{
				errorMessage !== '' ? errorMessage.update( (val) => val = '' ) : undefined

				let id = user.user.uid
				db.collection('users').doc(id).set({
					firstname,lastname
				}).then(()=>{
					console.log('user registered')
				}).catch(()=>{
					console.log('error registering user')
				})
			})

		} catch(error) {
			errorMessage.update(val=>val={'code': error.code, 'message': error.message})
		}
	}

</script>

<div class="comp-sign-in">
	<div class="sign-in-inner">
		{#if $lostPassword}
			<div class="form-wrapper">
				<div class="banner title">
					<h2 class="text center bold contrast">Send link to reset password</h2>
				</div>
				<form>
					<div class='input-pair {$errorMessage !== null ? 'error' : undefined}'>
						<label for="">
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" class="svg-inline--fa fa-envelope fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>						</label>
						<input class="input white" type="text" placeholder="E-mail" bind:value={email}>
					</div>
					<button type="button" class="button white" on:click={sendResetPasswordEmail(email)}>Send link</button>
				</form>
				<div class="form-footer">
					<div class="change-form" on:click={lostMyPassword}>
						<p class="text pointer">Log in normally</p>
					</div>
					{#if $errorMessage}
						<div class="error-message">
							<span class="text danger">{$errorMessage.message}</span>
						</div>
					{/if}
				</div>
			</div>
		{:else if $haveNoProfile}
			<div class="form-wrapper">
				<div class="banner title">
					<h2 class="text center bold contrast">Sign in</h2>
				</div>
				<form action="">
					<div class='input-pair {$errorMessage !== null ? 'error' : undefined} '>
						<label for="">
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-edit" class="svg-inline--fa fa-user-edit fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h274.9c-2.4-6.8-3.4-14-2.6-21.3l6.8-60.9 1.2-11.1 7.9-7.9 77.3-77.3c-24.5-27.7-60-45.5-99.9-45.5zm45.3 145.3l-6.8 61c-1.1 10.2 7.5 18.8 17.6 17.6l60.9-6.8 137.9-137.9-71.7-71.7-137.9 137.8zM633 268.9L595.1 231c-9.3-9.3-24.5-9.3-33.8 0l-37.8 37.8-4.1 4.1 71.8 71.7 41.8-41.8c9.3-9.4 9.3-24.5 0-33.9z"></path></svg>
						</label>
						<input class="input white" type="text" placeholder="Firstname" bind:value={firstname}>
					</div>
					<div class='input-pair {$errorMessage !== null ? 'error' : undefined} '>
						<label for="">
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-edit" class="svg-inline--fa fa-user-edit fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h274.9c-2.4-6.8-3.4-14-2.6-21.3l6.8-60.9 1.2-11.1 7.9-7.9 77.3-77.3c-24.5-27.7-60-45.5-99.9-45.5zm45.3 145.3l-6.8 61c-1.1 10.2 7.5 18.8 17.6 17.6l60.9-6.8 137.9-137.9-71.7-71.7-137.9 137.8zM633 268.9L595.1 231c-9.3-9.3-24.5-9.3-33.8 0l-37.8 37.8-4.1 4.1 71.8 71.7 41.8-41.8c9.3-9.4 9.3-24.5 0-33.9z"></path></svg>
						</label>
						<input class="input white" type="text" placeholder="Lastname" bind:value={lastname}>
					</div>
					<div class='input-pair {$errorMessage !== null ? 'error' : undefined} '>
						<label for="">
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-edit" class="svg-inline--fa fa-user-edit fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h274.9c-2.4-6.8-3.4-14-2.6-21.3l6.8-60.9 1.2-11.1 7.9-7.9 77.3-77.3c-24.5-27.7-60-45.5-99.9-45.5zm45.3 145.3l-6.8 61c-1.1 10.2 7.5 18.8 17.6 17.6l60.9-6.8 137.9-137.9-71.7-71.7-137.9 137.8zM633 268.9L595.1 231c-9.3-9.3-24.5-9.3-33.8 0l-37.8 37.8-4.1 4.1 71.8 71.7 41.8-41.8c9.3-9.4 9.3-24.5 0-33.9z"></path></svg>
						</label>
						<input class="input white" type="text" placeholder="E-mail" bind:value={email}>
					</div>
					<div class='input-pair {$errorMessage !== null ? 'error' : undefined} '>
						<label for="">
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-edit" class="svg-inline--fa fa-user-edit fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h274.9c-2.4-6.8-3.4-14-2.6-21.3l6.8-60.9 1.2-11.1 7.9-7.9 77.3-77.3c-24.5-27.7-60-45.5-99.9-45.5zm45.3 145.3l-6.8 61c-1.1 10.2 7.5 18.8 17.6 17.6l60.9-6.8 137.9-137.9-71.7-71.7-137.9 137.8zM633 268.9L595.1 231c-9.3-9.3-24.5-9.3-33.8 0l-37.8 37.8-4.1 4.1 71.8 71.7 41.8-41.8c9.3-9.4 9.3-24.5 0-33.9z"></path></svg>
						</label>
						<input class="input white" type="password" placeholder="Password" bind:value={password}>
					</div>
					<button type="button" class="button white" on:click={signUp(email,password)}>Sign up</button>
				</form>
				<div class="form-footer">

					{#if $errorMessage}
						<div class="error-message">
							<span class="text danger">{$errorMessage.message}</span>
						</div>
					{/if}
				</div>
			</div>
		{:else}
			<div class="form-wrapper">
				<div class="banner title">
					<h2 class="text center bold contrast">Sign in</h2>
				</div>
				<form>
					<div class='input-pair {$errorMessage !== null ? 'error' : undefined} '>
						<label for="">
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" class="svg-inline--fa fa-envelope fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>						</label>
						<input class="input white" type="text" placeholder="E-mail" bind:value={email}>
					</div>
					<div class='input-pair {$errorMessage !== null ? 'error' : undefined} '>
						<label for="">
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="unlock-alt" class="svg-inline--fa fa-unlock-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zM264 408c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z"></path></svg>
						</label>
						<input class="input white" type="password" placeholder="Password" bind:value={password}>
					</div>
					<button type="button" class="button white" on:click={signIn(email,password)}>Sign in</button>
				</form>
				<div class="form-footer">
					<div class="change-form" on:click={lostMyPassword}>
						<p class="text pointer left">I lost my password</p>
					</div>
					<div class="change-form" on:click={noProfile}>
						<p class="text pointer right">No profile yet?</p>
					</div>
					{#if $errorMessage}
						<div class="error-message">
							<span class="text danger">{$errorMessage.message}</span>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>

</div>
<style>
	.comp-sign-in {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		background: rgba(0,0,0,.4);
		display: grid;
		justify-content: center;
		align-items: center;
	}
	.sign-in-inner {
		width: 80vw;
		max-width: 400px;
		background-color: #fff;
		box-sizing: border-box;
		display: grid;
		align-items: center;
		border-radius: 8px;
		transition: all .5s ease;
	}
	.form-wrapper {
		display: grid;
		justify-items: center;
		grid-template-rows: 1fr 6fr 1fr;
		grid-gap: 1rem;
		height: 100%;
		width: 100%;
		max-height: 600px;
	}
	form {
		display: grid;
		align-content: center;
		justify-content: center;
		grid-gap: 1rem;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		width: 100%;
	}
	.input-pair {
		display: grid;
		grid-template-columns: 1fr 10fr;
		align-items: center;
	}
	.input-pair.error input::placeholder,
	.input-pair.error svg {
		color: var(--textError);
	}
	.input-pair.error {
		animation-name: shake;
		animation-duration: .5s;
		animation-iteration-count: 1;
		animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
	}
	@keyframes shake {
		0% {margin-left: 0px}
		25% {margin-left: -7px}
		50% {margin-left: 7px}
		100% {margin-left: 0px}
	}
	input {
		border: 0;
		border-bottom: 1px solid var(--textLight);
		border-radius: 0px;
	}
	button {
		margin-top: 1.4rem;
	}
	label {
		background: transparent;
		height: 100%;
		width: 100%;
		display: grid;
		align-items: center;
		justify-content: center;
		border-bottom: 1px solid var(--textLight)
	}
	label svg {
		width: 100%;
		padding-left: 5px;
		padding-right: 5px;
		color: #EEE;
	}
	.banner {
		width: 100%;
		display: grid;
		align-items: center;
		justify-content: center;
		padding-top: 1rem;
		padding-bottom: 1rem;
	}
	.form-footer {
		display:grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 10px;
		width: 100%;
		padding: 1rem;
	}

	.error-message {
		grid-column: 1/3;
		padding: 1rem;
	}
</style>