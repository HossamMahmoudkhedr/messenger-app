import 'firebase/auth';
import firebase from 'firebase/app';
export const auth = firebase
	.initializeApp({
		apiKey: 'AIzaSyD5r2KJ-R0r95sEYsGkFhmBtELyCHEk6xs',
		authDomain: 'messenger-76b17.firebaseapp.com',
		projectId: 'messenger-76b17',
		storageBucket: 'messenger-76b17.appspot.com',
		messagingSenderId: '444858957603',
		appId: '1:444858957603:web:b5d4861bc7604062fa1696',
	})
	.auth();
