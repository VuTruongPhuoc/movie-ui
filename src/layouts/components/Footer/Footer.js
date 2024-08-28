import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('footer-list')}>
                        <div className={cx('menu-list')}>
                            <div className={cx('title')}>Giới thiệu</div>
                            <div className={cx('link')}>Trang chủ</div>
                            <div className={cx('link')}>PMovie</div>
                        </div>
                        <div className={cx('menu-list')}>
                            <div className={cx('title')}>Hợp tác</div>
                            <div className={cx('link')}>Thông tin</div>
                            <div className={cx('link')}>Thông tin</div>
                        </div>
                        <div className={cx('menu-list')}>
                            <div className={cx('title')}>Điều khoản</div>
                            <div className={cx('link')}>Thông tin</div>
                            <div className={cx('link')}>Thông tin</div>
                        </div>
                    </div>
                </div>
                <div className={cx('row')}>
                    <div className={cx('copyright')}>Copyright © 2024 by PMovie</div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
