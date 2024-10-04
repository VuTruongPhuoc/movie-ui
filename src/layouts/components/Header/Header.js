import { useContext, useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faHistory, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';

import Menu from '~/components/Popper/Menu';
import Search from '~/layouts/components/Search';
import Button from '~/components/Button';
import config from '~/config';
import styles from './Header.module.scss';
import Nav, { NavItem } from './Nav';
import { PopperWrapper } from '~/components/Popper';
import ModalCustom, { ModalLogin, ModalRegister } from '~/components/Modal';
import jwtTokenHandler from '~/utils/jwtTokenHandler';
import AuthContext from '~/context/AuthProvider';
import * as categoryServices from '~/services/categoryServices';

const cx = classNames.bind(styles);
const Header = () => {
    let { currentUser, logout } = useContext(AuthContext);

    const menuItems = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Thông tin',
            to: config.privateroutes.profile,
        },
        {
            icon: <FontAwesomeIcon icon={faUserCircle} />,
            title: 'Phuoc vu',
            to: '/account',
            separate: true,
        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Đăng xuất',
            to: '/',
            onClick: (e) => {
                logout();
                setIsCurrentUser(false);
            },
        },
    ];
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [isShowFormLogin, setIsShowFormLogin] = useState(false);
    const [isFormLogin, setIsFormLogin] = useState(true);
    const [genres, setGenres] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const results = await categoryServices.getall();
            setGenres(results);
        };
        fetchData();
    }, []);

    if (!currentUser) {
        currentUser = localStorage.getItem(process.env.REACT_APP_CURRENT_USER);
    }
    jwtTokenHandler();
    const formRef = useRef();

    useEffect(() => {
        setIsShowFormLogin(false);
        setIsCurrentUser(!!currentUser);
    }, [currentUser]);
    const CloseFormLogin = () => {
        setIsShowFormLogin(false);
        setIsFormLogin(true);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('main-header')}>
                <NavLink className={cx('logo')} to={config.routes.home}>
                    <div style={{ fontWeight: 700, fontSize: '1.8rem' }}>PMovie</div>
                </NavLink>
                <Nav>
                    <div className={cx('nav-menu')}>
                        <NavLink className={cx('menu-trigger')}>Browse</NavLink>
                    </div>
                    <NavItem title="Trang chủ" to={config.routes.home} />

                    <NavItem title="Phim bộ" to={config.routes.tvshows} />

                    <NavItem title="Phim lẻ" to={config.routes.movies} />

                    <Tippy
                        interactive={true}
                        placement="bottom-start"
                        delay={[200, 500]}
                        zIndex={998}
                        hideOnClick={false}
                        render={(attrs) => (
                            <div className={cx('genres-list-tippy')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <div className={cx('genres-list')}>
                                        {genres &&
                                            genres.map((item, index) => {
                                                return (
                                                    <Link
                                                        to={`${config.routes.genre}/${item.id}`}
                                                        className={cx('genre-link')}
                                                        key={item.id}
                                                    >
                                                        <div className={cx('genre-item')}>{item.name}</div>
                                                    </Link>
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
                        <Tippy
                            interactive={true}
                            delay={[100, 300]}
                            placement="bottom"
                            zIndex={997}
                            hideOnClick={false}
                            render={(attrs) => (
                                <div className={cx('option-content')} tabIndex={-1} {...attrs}>
                                    <PopperWrapper>
                                        <div className={cx('option-item')}>
                                            <span className={cx('text')}>Lịch sử</span>
                                        </div>
                                    </PopperWrapper>
                                </div>
                            )}
                        >
                            <Link to={config.routes.history} style={{ color: 'var(--white)' }}>
                                <div className={cx('history')}>
                                    <FontAwesomeIcon icon={faHistory} className={cx('history-icon')} />
                                </div>
                            </Link>
                        </Tippy>
                    </div>
                    <div className={cx('nav-element')}>
                        <Tippy
                            interactive={true}
                            delay={[100, 300]}
                            placement="bottom"
                            zIndex={997}
                            hideOnClick={false}
                            render={(attrs) => (
                                <div className={cx('option-content')} tabIndex={-1} {...attrs}>
                                    <PopperWrapper>
                                        <div className={cx('option-item')}>
                                            <span className={cx('text')}>Theo dõi</span>
                                        </div>
                                    </PopperWrapper>
                                </div>
                            )}
                        >
                            <Link to={config.routes.follow} style={{ color: 'var(--white)' }}>
                                <div className="follow">
                                    <FontAwesomeIcon icon={faBookmark} className={cx('follow-icon')} />
                                </div>
                            </Link>
                        </Tippy>
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
                                delay={[100, 1000]}
                                placement="bottom-end"
                                zIndex={997}
                                hideOnClick={false}
                                render={(attrs) => (
                                    <div className={cx('login-content')} tabIndex={-1} {...attrs}>
                                        <PopperWrapper>
                                            <div className={cx('login-item')}>
                                                <span className={cx('text')}>Đăng nhập để xem phim</span>
                                                <div className={cx('login-btn')}>
                                                    <Button
                                                        primary
                                                        onClick={() => {
                                                            setIsShowFormLogin(true);
                                                            setIsFormLogin(true);
                                                        }}
                                                    >
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
            {isShowFormLogin && (
                <ModalCustom onClose={CloseFormLogin}>
                    {isFormLogin ? (
                        <ModalLogin onClickRegister={() => setIsFormLogin(false)} ref={formRef} />
                    ) : (
                        <ModalRegister onClickLogin={() => setIsFormLogin(true)} />
                    )}
                </ModalCustom>
            )}
        </div>
    );
};

export default Header;
