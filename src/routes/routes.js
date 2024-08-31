import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import NoPage from '~/pages/NoPage';
import History from '~/pages/History';
import Track from '~/pages/Track';
import config from '~/config';
import TVShows from '~/pages/TVShows';
import Movies from '~/pages/Movies';
import Latest from '~/pages/Latest';
import Album from '~/pages/Album';

//Public routes
const publicroutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.history, component: History },
    { path: config.routes.track, component: Track },
    { path: config.routes.tvshows, component: TVShows },
    { path: config.routes.movies, component: Movies },
    { path: config.routes.latest, component: Latest },
    { path: config.routes.album, component: Album },
    { path: config.routes.nopage, component: NoPage, layout: null },
];

//Private routes
const privateroutes = [];

export { publicroutes, privateroutes };
