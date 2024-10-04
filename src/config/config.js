const routes = {
    home: '/',
    nopage: '/nopage',
    tvshows: '/list/tvshows',
    movies: '/list/movies',
    latest: '/latest',
    album: '/album',
    watch: `/watch`,
    history: '/history',
    follow: '/follow',
    genre: `/genre`,
    search: `search`,
    noaccess: '/no-access',
};
const privateroutes = {
    profile: '/profile',
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
    episode: '/admin/episode',
};
const config = { routes, privateroutes, adminroutes };

export default config;
