import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from '~/layouts/DefaultLayout';
import { publicroutes } from './routes';
import { Fragment } from 'react';
import SideBar from './layouts/components/Sidebar/Sidebar';
import LayoutAccount from './layouts/LayoutAccount';

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
                    } else if (route.doublelayout === SideBar) {
                        Layout = ({ children }) => <LayoutAccount>{children}</LayoutAccount>;
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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
