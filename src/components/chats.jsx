import React, { useRef, useState, useEffect } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';

import { useAuth } from '../contexts/authContext';

import { auth } from '../firebase';

export default function Chats() {
	const didMountRef = useRef(false);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();
	const navigate = useNavigate();

	async function handleLogout() {
		await auth.signOut();
		navigate('/');
	}

	async function getFile(url) {
		let response = await fetch(url);
		let data = await response.blob();
		return new File([data], 'test.jpg', { type: 'image/jpeg' });
	}
	useEffect(() => {
		if (!didMountRef.current) {
			didMountRef.current = true;

			if (!user || user === null) {
				navigate('/');
				return;
			}

			// Get-or-Create should be in a Firebase Function
			axios
				.get('https://api.chatengine.io/users/me/', {
					headers: {
						'project-id': process.env.REACT_APP_CHAT_ENGINE_ID,
						'user-name': user.email,
						'user-secret': user.uid,
					},
				})

				.then(() => setLoading(false))

				.catch((e) => {
					let formdata = new FormData();
					formdata.append('email', user.email);
					formdata.append('username', user.email);
					formdata.append('secret', user.uid);
					getFile(user.photoURL).then((avatar) => {
						formdata.append('avatar', avatar, avatar.name);

						axios
							.post('https://api.chatengine.io/users/', formdata, {
								headers: {
									'private-key': process.env.REACT_APP_CHAT_ENGINE_KEY,
								},
							})
							.then(() => setLoading(false))
							.catch((e) => console.log('e', e.response));
					});
				});
		}
	}, [user, navigate]);
	if (!user || loading) return <div className="text-center">Loading...</div>;
	// let com = (
	// 	<ChatEngine
	// 		height="calc(100vh-66px)"
	// 		projectID="85ad1409-dbb7-45eb-a320-cdd959670198"
	// 		userName={user.email}
	// 		userSecret={user.uid}
	// 	/>
	// );
	// setInterval(() => {
	// 	com = (
	// 		<ChatEngine
	// 			height="calc(100vh-66px)"
	// 			projectID="85ad1409-dbb7-45eb-a320-cdd959670198"
	// 			userName={user.email}
	// 			userSecret={user.uid}
	// 		/>
	// 	);
	// }, 3000);
	return (
		<div className="container-fluid px-0">
			<div
				className="d-flex justify-content-between align-items-center text-white py-2 px-4"
				style={{
					background:
						'linear-gradient(90deg, rgba(168,73,232,1) 0%, rgba(5,95,184,1) 0%, rgba(159,30,171,1) 92%)',
				}}>
				<h1>Messenger</h1>
				<button
					onClick={handleLogout}
					className="btn bg-transparent border border-1 text-white">
					Logout
				</button>
			</div>
			{/* {com} */}
			<ChatEngine
				height="calc(100vh-66px)"
				projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
				userName={user.email}
				userSecret={user.uid}
			/>
		</div>
	);
}
