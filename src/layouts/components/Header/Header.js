import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import Nav, { NavItem } from './Nav';
import config from '~/config';

const cx = classNames.bind(styles);

const Header = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('main-header')}>
                <NavLink className={cx('logo')} to={config.routes.home}>
                    logo
                </NavLink>
                <Nav>
                    <div className={cx('nav-menu')}>
                        <NavLink className={cx('menu-trigger')}>Browse</NavLink>
                    </div>
                    <NavItem title="Thể loại" to={config.routes.profile} />
                    <NavItem title="Năm" to="/#/" />
                    <NavItem title="Theo dõi" to={config.routes.track} />
                    <NavItem title="Lịch sử" to={config.routes.history} />
                </Nav>
                <div className={cx('secondary-nav')}>
                    <div className={cx('nav-element')}>
                        <div className={cx('search-box')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                    </div>
                    <div className={cx('nav-element')}>
                        <div className={cx('notify')}>
                            <FontAwesomeIcon icon={faBell} />
                        </div>
                    </div>
                    <div className={cx('nav-element')}>
                        <div className={cx('account-menu')}>
                            <img
                                className="profile-icon"
                                src="https://occ-0-395-58.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABdEyUfiGKB_IE32uWZW3KcuE4Vk5kEFKQM1HrVqjN4jNv-Robrvl9ctyTBXJkMcZBfIjTnqQDRqsf7TQTr_RwCEwgwqxhME.png?r=d47"
                                alt="profile"
                            />
                            <span className={cx('caret')}></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
