import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { forwardRef } from 'react';
import config from '~/config';

const cx = classNames.bind(styles);

const MenuBox = forwardRef((props, ref) => {
    const { isOpen } = props;
    return (
        <div className={cx('menu-box', { 'show-menu': isOpen })}>
            <div className={cx('menu-background')}></div>
            <div className={cx('menu-content')} ref={ref}>
                <div className={cx('menu-user')}>
                    <div className={cx('user-info')}>
                        <Link to="#" className={cx('user-content')}>
                            <img
                                src="https://dongphim.ch/themes/iqiyi/img/avatar_default.png"
                                alt=""
                                className={cx('user-avatar')}
                            />
                            <div className={cx('user-name')}></div>
                        </Link>
                    </div>
                </div>
                <Link to={`${config.routes.tvshows}`}>
                    <div className={cx('menu-item')}>Phim bộ</div>
                </Link>
                <Link to={`${config.routes.movies}`}>
                    <div className={cx('menu-item')}>Phim lẻ</div>
                </Link>
                <Link to={`${config.routes.filter}`}>
                    <div className={cx('menu-item')}>Lọc phim</div>
                </Link>
                <Link to={`${config.routes.history}`}>
                    <div className={cx('menu-item')}>Lịch sử</div>
                </Link>
                <Link to={`${config.routes.follow}`}>
                    <div className={cx('menu-item')}>Theo dõi</div>
                </Link>
            </div>
        </div>
    );
});

export default MenuBox;
