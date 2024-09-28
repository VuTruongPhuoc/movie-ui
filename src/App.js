import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Fragment } from 'react';

import './App.css';
import DefaultLayout from '~/layouts/DefaultLayout';
import { adminroutes, privateroutes, publicroutes } from './routes';
import SideBar from './layouts/components/Sidebar/Sidebar';
import LayoutAccount from './layouts/LayoutAccount';
import AdminDefaultLayout from '~/layouts/AdminDefaultLayout';
import NoPage from './pages/NoPage';
import AdminRoute from './routes/AdminRoute';
import PrivateRoute from './routes/PrivateRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {publicroutes.map((route, index) => {
                    let Layout = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
                {privateroutes.map((route, index) => {
                    let Layout = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    } else if (route.doublelayout === SideBar) {
                        Layout = ({ children }) => <LayoutAccount>{children}</LayoutAccount>;
                    }

                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <Page />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />
                    );
                })}
                {adminroutes.map((route, index) => {
                    const LayoutAdmin = AdminDefaultLayout;

                    const PageAdmin = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <AdminRoute>
                                    <LayoutAdmin>
                                        <PageAdmin />
                                    </LayoutAdmin>
                                </AdminRoute>
                            }
                        />
                    );
                })}
                <Route
                    path="*"
                    element={
                        <DefaultLayout>
                            <NoPage />
                        </DefaultLayout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
