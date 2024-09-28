import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from '~/layouts/components/Sidebar/Menu';
import config from '~/config';
import {
    faArrowLeft,
    faCableCar,
    faCloudSun,
    faFilm,
    faLineChart,
    faPassport,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Sidebar() {
    const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_CURRENT_USER));
    const avatarUrl = currentUser.avatarUrl;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-profile')}>
                <div className={cx('avatar')}>
                    <img src={avatarUrl ? avatarUrl : 'hihi'} alt="?" />
                </div>
                <div className={cx('name')}>Hello, {currentUser.displayName}</div>
            </div>
            <div className={cx('menu-list')}>
                <Menu>
                    <MenuItem
                        title="Trang chủ"
                        to={config.adminroutes.admin}
                        icon={<FontAwesomeIcon icon={faLineChart} />}
                    />

                    <MenuItem
                        title="Người dùng"
                        to={config.adminroutes.user}
                        icon={<FontAwesomeIcon icon={faUser} />}
                    />
                    <MenuItem title="Phim" to={config.adminroutes.film} icon={<FontAwesomeIcon icon={faFilm} />} />
                    <MenuItem
                        title="Phần"
                        to={config.adminroutes.section}
                        icon={<FontAwesomeIcon icon={faPassport} />}
                    />
                    <MenuItem
                        title="Thể loại"
                        to={config.adminroutes.category}
                        icon={<FontAwesomeIcon icon={faCableCar} />}
                    />
                    <MenuItem
                        title="Đất nước"
                        to={config.adminroutes.country}
                        icon={<FontAwesomeIcon icon={faCloudSun} />}
                    />
                    <MenuItem
                        title="Lịch phim"
                        to={config.adminroutes.schedule}
                        icon={<FontAwesomeIcon icon={faClock} />}
                    />

                    <MenuItem title="Thoát" to={config.routes.home} icon={<FontAwesomeIcon icon={faArrowLeft} />} />
                </Menu>
            </div>
        </div>
    );
}

export default Sidebar;
