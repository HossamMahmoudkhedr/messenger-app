import React from 'react';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../firebase.js';
import firebase from 'firebase/app';

const stylingSignInBUttons = `btn btn-primary d-flex align-items-center gap-2 py-2 `;

const Login = () => {
	return (
		<div
			className="w-100 vh-100 d-flex justify-content-center align-items-center bg-body"
			style={{
				background:
					'linear-gradient(0deg, rgba(168,73,232,1) 0%, rgba(5,95,184,1) 0%, rgba(159,30,171,1) 72%)',
			}}>
			<div className="login d-flex flex-column align-items-center gap-4 bg-white p-5 rounded-5 shadow-lg">
				<h2>Welcome to Messenger!</h2>
				<button
					className={`${stylingSignInBUttons} bg-white text-black border-black  `}
					onClick={() =>
						auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
					}>
					<FcGoogle /> Sign In with Google
				</button>
				<button
					className={`${stylingSignInBUttons} `}
					onClick={() =>
						auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
					}>
					<BsFacebook /> Sign In with Facebook
				</button>
			</div>
		</div>
	);
};

export default Login;
