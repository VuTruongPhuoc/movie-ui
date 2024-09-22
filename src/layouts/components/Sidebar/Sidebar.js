import classNames from 'classnames/bind';
import { faBars, faClockRotateLeft, faGear, faList } from '@fortawesome/free-solid-svg-icons';

import config from '~/config';
import Menu, { MenuItem } from './Menu';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function SideBar() {
    return (
        <>
            <aside className={cx('wrapper')}>
                <Menu>
                    <MenuItem title="Hồ sơ" to={config.routes.profile} icon={faList} />
                    <MenuItem title="Tài khoản" to={config.routes.account} icon={faGear} />
                    <MenuItem title="Lịch sử" to={config.routes.history} icon={faClockRotateLeft} />

                    {/* <MenuItem title="Profile" to="/@hoaa" icon="hhi"></MenuItem> */}
                </Menu>
            </aside>
        </>
    );
}

export default SideBar;
