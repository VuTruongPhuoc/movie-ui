import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from '~/layouts/components/Sidebar/Menu';
import config from '~/config';
import { faArrowLeft, faFilm, faLineChart, faPassport } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-profile')}>
                <div className={cx('avatar')}>
                    <img src="https://animehay.cam/upload/avatar/37371.jpg?t=1726814583" alt="?" />
                </div>
                <div className={cx('name')}>Phuoc vt</div>
            </div>
            <nav className={cx('nav')}>
                <Menu>
                    <MenuItem title="Trang chủ" to={config.adminroutes.admin} icon={faLineChart} />
                    <MenuItem title="Phần" to={config.adminroutes.section} icon={faPassport} />
                    <MenuItem title="Phim" to={config.adminroutes.film} icon={faFilm} />
                    <MenuItem title="Thoát" to={config.routes.home} icon={faArrowLeft} />
                </Menu>
            </nav>
        </div>
    );
}

export default Sidebar;
