import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import NoPage from '~/pages/NoPage';
import History from '~/pages/History';
import Track from '~/pages/Track';
import config from '~/config';
import TVShows from '~/pages/TVShows';
import Movies from '~/pages/Movies';
import Latest from '~/pages/Latest';

import Watch from '~/pages/Watch';
import Account from '~/pages/Account';
import Sidebar from '~/layouts/components/Sidebar';
import HomeAdmin from '~/pages/HomeAdmin';
import SectionAdmin from '~/pages/SectionAdmin';
import FilmAdmin from '~/pages/FilmAdmin';
import CategoryAdmin from '~/pages/CategoryAdmin';
import UserAdmin from '~/pages/UserAdmin';
import NoAccess from '~/pages/NoAccess';
import CountryAdmin from '~/pages/CountryAdmin';
import ScheduleAdmin from '~/pages/ScheduleAdmin';
import EpisodeAdmin from '~/pages/EpisodeAdmin';
import Album from '~/pages/Album';
import Genre from '~/pages/Genre';
import Search from '~/pages/Search';

//Public routes
const publicroutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.tvshows, component: TVShows },
    { path: config.routes.movies, component: Movies },
    { path: config.routes.latest, component: Latest },
    { path: config.routes.album + '/:slug', component: Album },
    { path: config.routes.watch + '/:slug/:episode', component: Watch },
    { path: config.routes.genre, component: Genre },
    { path: config.routes.search, component: Search },
    { path: config.routes.nopage, component: NoPage },
    { path: config.routes.noaccess, component: NoAccess },
];
const privateroutes = [
    { path: config.privateroutes.profile, component: Profile, doublelayout: Sidebar },
    { path: config.privateroutes.history, component: History, doublelayout: Sidebar },
    { path: config.privateroutes.track, component: Track },
    { path: config.privateroutes.account, component: Account, doublelayout: Sidebar },
];
//admin routes
const adminroutes = [
    { path: config.adminroutes.admin, component: HomeAdmin },
    { path: config.adminroutes.section, component: SectionAdmin },
    { path: config.adminroutes.film, component: FilmAdmin },
    { path: config.adminroutes.category, component: CategoryAdmin },
    { path: config.adminroutes.user, component: UserAdmin },
    { path: config.adminroutes.country, component: CountryAdmin },
    { path: config.adminroutes.schedule, component: ScheduleAdmin },
    { path: config.adminroutes.episode, component: EpisodeAdmin },
];

export { publicroutes, privateroutes, adminroutes };
