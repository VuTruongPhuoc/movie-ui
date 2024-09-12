import { useContext, useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';

import Menu from '~/components/Popper/Menu';
import Search from '~/components/Search';
import Button from '~/components/Button';
import config from '~/config';
import styles from './Header.module.scss';
import Nav, { NavItem } from './Nav';
import { PopperWrapper } from '~/components/Popper';
import Modal, { ModalLogin } from '~/components/Modal';
import ModalRegister from '~/components/Modal/ModalRegister';
import AuthContext from '~/context/AuthProvider';

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
let isCurrentUser = false;
const Header = () => {
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
            to: '/logout',
            onClick: (e) => {
                e.preventDefault();
                setAuth({});
            },
        },
    ];
    const { auth, setAuth } = useContext(AuthContext);

    const [isOpenFormLogin, setIsOpenFormLogin] = useState(false);
    const [isFormLogin, setIsFormLogin] = useState(true);

    useEffect(() => {
        isCurrentUser = !!auth.username;
        setIsOpenFormLogin(false);
    }, [auth.username]);

    const CloseFormLogin = () => {
        setIsOpenFormLogin(false);
        setIsFormLogin(true);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('main-header')}>
                <NavLink className={cx('logo')} to={config.routes.home}>
                    PMovie
                </NavLink>
                <Nav>
                    <div className={cx('nav-menu')}>
                        <NavLink className={cx('menu-trigger')}>Browse</NavLink>
                    </div>
                    <NavItem title="Trang chủ" to={config.routes.home} />
                    <NavItem title="Phim mới" to={config.routes.latest} />

                    <NavItem title="Phim bộ" to={config.routes.tvshows} />

                    <NavItem title="Phim lẻ" to={config.routes.movies} />

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
                        <NavItem
                            title="Thể loại"
                            to="/genre"
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            Thể loại
                        </NavItem>
                    </Tippy>
                </Nav>
                <div className={cx('secondary-nav')}>
                    <div className={cx('nav-element')}>
                        <Search />
                    </div>

                    <div className={cx('nav-element')}>
                        {isCurrentUser ? (
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
                        ) : (
                            <Tippy
                                interactive={true}
                                delay={[200, 3000]}
                                placement="bottom-end"
                                zIndex={997}
                                render={(attrs) => (
                                    <div className={cx('login-content')} tabIndex={-1} {...attrs}>
                                        <PopperWrapper>
                                            <div className={cx('login-item')}>
                                                <span className={cx('text')}>Đăng nhập để xem phim</span>
                                                <div className={cx('login-btn')}>
                                                    <Button primary onClick={() => setIsOpenFormLogin(true)}>
                                                        Login
                                                    </Button>
                                                </div>
                                            </div>
                                        </PopperWrapper>
                                    </div>
                                )}
                            >
                                <div className={cx('account')}>
                                    <FontAwesomeIcon icon={faUserCircle} className={cx('user-icon')} />
                                </div>
                            </Tippy>
                        )}
                    </div>
                </div>
            </div>
            {isOpenFormLogin && (
                <Modal onClose={CloseFormLogin}>
                    {isFormLogin ? (
                        <ModalLogin onClickRegister={() => setIsFormLogin(false)} isCurrentUser={isCurrentUser} />
                    ) : (
                        <ModalRegister onClickLogin={() => setIsFormLogin(true)} />
                    )}
                </Modal>
            )}
        </div>
    );
};

export default Header;
