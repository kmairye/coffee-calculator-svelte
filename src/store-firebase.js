import firebase from 'firebase'
import { writable } from 'svelte/store'
import {secretFirebaseConfig} from './store-secret.js'

// #################### Firebase project configuration
var firebaseConfig = secretFirebaseConfig
firebase.initializeApp(firebaseConfig)


// #################### Exported variables
export const auth = firebase.auth()
export const db = firebase.firestore()
export const user = writable(null)


// #################### Make sure user is updated on auth changes
auth.onAuthStateChanged(res => {
	if (res) {
		user.update(val => val = res)
	} else {
		user.update(val => val = null)
	}
})