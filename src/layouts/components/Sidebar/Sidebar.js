import classNames from 'classnames/bind';
import { faBars, faClockRotateLeft, faGear, faList } from '@fortawesome/free-solid-svg-icons';

import config from '~/config';
import Menu, { MenuItem } from './Menu';
import styles from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function SideBar() {
    return (
        <>
            <aside className={cx('wrapper')}>
                <Menu>
                    <MenuItem
                        title="Hồ sơ"
                        to={config.privateroutes.profile}
                        icon={<FontAwesomeIcon icon={faList} />}
                    />
                    <MenuItem
                        title="Tài khoản"
                        to={config.privateroutes.account}
                        icon={<FontAwesomeIcon icon={faGear} />}
                    />
                    <MenuItem
                        title="Lịch sử"
                        to={config.privateroutes.history}
                        icon={<FontAwesomeIcon icon={faClockRotateLeft} />}
                    />

                    {/* <MenuItem title="Profile" to="/@hoaa" icon="hhi"></MenuItem> */}
                </Menu>
            </aside>
        </>
    );
}

export default SideBar;
