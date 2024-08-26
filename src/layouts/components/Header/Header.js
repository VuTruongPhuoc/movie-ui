import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import Nav, { NavItem } from './Nav';
import config from '~/config';
import Tippy from '@tippyjs/react/headless';
import { PopperWrapper } from '~/components/Popper';
import Menu from '~/components/Popper/Menu';
import Search from '~/components/Search';

const cx = classNames.bind(styles);

const genresList = [
    {
        id: 1,
        name: 'hanh dong',
    },
    {
        id: 2,
        name: 'hanh dong',
    },
    {
        id: 3,
        name: 'hanh dong',
    },
    {
        id: 4,
        name: 'hanh dong',
    },
    {
        id: 5,
        name: 'hanh dong',
    },
    {
        id: 6,
        name: 'hanh dong',
    },
    {
        id: 7,
        name: 'hanh dong',
    },
    {
        id: 8,
        name: 'hanh dong',
    },
    {
        id: 9,
        name: 'hanh dong',
    },
    {
        id: 10,
        name: 'hanh dong',
    },
];

const menuItems = [
    {
        icon: <FontAwesomeIcon icon={faUserCircle} />,
        title: 'Phuoc vu',
        to: '@/phuocvu',
        separate: true,
    },
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Account',
        to: '/account',
    },
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Đăng xuất',
        to: '/signout',
    },
];

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

                    <Tippy
                        interactive={true}
                        placement="bottom-start"
                        delay={[200, 500]}
                        zIndex={998}
                        render={(attrs) => (
                            <div className={cx('genres-list-tippy')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <div className={cx('genres-list')}>
                                        {genresList.map((item, index) => {
                                            return (
                                                <div className={cx('genre-item')} key={item.id}>
                                                    {item.name}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <NavItem title="Thể loại" to="/a/">
                            Thể loại
                        </NavItem>
                    </Tippy>
                </Nav>
                <div className={cx('secondary-nav')}>
                    <div className={cx('nav-element')}>
                        <Search />
                    </div>

                    <div className={cx('nav-element')}>
                        <Menu items={menuItems}>
                            <div className={cx('account-menu')}>
                                <img
                                    className="profile-icon"
                                    src="https://occ-0-395-58.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABdEyUfiGKB_IE32uWZW3KcuE4Vk5kEFKQM1HrVqjN4jNv-Robrvl9ctyTBXJkMcZBfIjTnqQDRqsf7TQTr_RwCEwgwqxhME.png?r=d47"
                                    alt="profile"
                                />
                                <span className={cx('caret')}></span>
                            </div>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
