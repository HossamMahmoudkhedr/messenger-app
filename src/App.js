import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import './App.css';
import RootLayout from './pages/rootLayout';
import Login from './components/login';

import Chats from './components/chats';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<RootLayout />}>
			<Route
				index
				element={<Login />}
			/>
			<Route
				path="/chats"
				element={<Chats />}
			/>
		</Route>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
