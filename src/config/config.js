const routes = {
    home: '/',
    nopage: '/nopage',
    tvshows: '/list/tvshows',
    movies: '/list/movies',
    latest: '/latest',
    album: '/album',
    watch: `/watch`,
    noaccess: '/no-access',
};
const privateroutes = {
    profile: '/profile',
    history: '/profile/history',
    track: '/track',
    account: '/profile/account',
};
const adminroutes = {
    admin: '/admin',
    user: '/admin/user',
    section: '/admin/section',
    film: '/admin/film',
    category: '/admin/category',
    country: '/admin/country',
    schedule: '/admin/schedule',
};
const config = { routes, privateroutes, adminroutes };

export default config;
