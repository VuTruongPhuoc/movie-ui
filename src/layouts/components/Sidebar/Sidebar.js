import classNames from 'classnames/bind';
import { faGear, faList } from '@fortawesome/free-solid-svg-icons';

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
                </Menu>
            </aside>
        </>
    );
}

export default SideBar;
