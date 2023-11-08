import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../contexts/authContext';
const RootLayout = () => {
	return (
		<AuthProvider>
			<Outlet />
		</AuthProvider>
	);
};

export default RootLayout;
