import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from '~/layouts/components/Sidebar/Menu';
import config from '~/config';
import { faArrowLeft, faFilm, faLineChart, faPassport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            <div className={cx('menu-list')}>
                <Menu>
                    <MenuItem
                        title="Trang chủ"
                        to={config.adminroutes.admin}
                        icon={<FontAwesomeIcon icon={faLineChart} />}
                    />
                    <MenuItem
                        title="Phần"
                        to={config.adminroutes.section}
                        icon={<FontAwesomeIcon icon={faPassport} />}
                    />
                    <MenuItem title="Phim" to={config.adminroutes.film} icon={<FontAwesomeIcon icon={faFilm} />} />
                    <MenuItem title="Thoát" to={config.routes.home} icon={<FontAwesomeIcon icon={faArrowLeft} />} />
                </Menu>
            </div>
        </div>
    );
}

export default Sidebar;
