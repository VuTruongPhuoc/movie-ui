import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import NoPage from '~/pages/NoPage';

//Public routes
const publicroutes = [
    { path: '/', component: Home },
    { path: 'profile', component: Profile },
    { path: 'nopage', component: NoPage, layout: null },
];

//Private routes
const privateroutes = [];

export { publicroutes, privateroutes };
