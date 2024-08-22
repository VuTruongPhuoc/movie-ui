import { BrowserRouter as Router, useRoutes, Outlet } from 'react-router-dom';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import NoPage from '~/pages/NoPage';
import './App.css';

// Thành phần chứa các tuyến con
function AppRoutes() {
    const routes = useRoutes([
        {
            path: '/',
            element: (
                <Home>
                    <Outlet /> {/* Chèn các phần tử con vào đây */}
                </Home>
            ),
            children: [
                {
                    path: 'profile',
                    element: <Profile />,
                },
                {
                    path: 'nopage',
                    element: <NoPage />,
                },
                {
                    path: '*',
                    element: <NoPage />, // Trang không tìm thấy
                },
            ],
        },
    ]);

    return routes;
}

function App() {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}

export default App;
