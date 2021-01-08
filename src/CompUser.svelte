<script>
	import {
		user,
		db
	} from './store-firebase.js'

	import SignOut from './CompSignOut.svelte'
	
	const docRef = db.collection("users").doc($user.uid);
	let firstName;
	docRef.get().then(function(doc) {
		if (doc.exists) {
			firstName = doc.data().firstname
		} else {
			console.log("No such document!");
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
	});


</script>


<div class="comp-user">
	<div class="hello">
		<p class="text large">Hello {firstName}</p>
		<p class="text">Freshly brewed data just for you</p>
	</div>
</div>

<style>

</style>