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
                        <div className={cx('item-list')}>
                            <div className={cx('item-title')}>Giới thiệu</div>
                            <div className={cx('item')}>Trang chủ</div>
                            <div className={cx('item')}>PMovie</div>
                        </div>
                        <div className={cx('item-list')}>
                            <div className={cx('item-title')}>Hợp tác</div>
                            <div className={cx('item')}>Thông tin</div>
                            <div className={cx('item')}>Thông tin</div>
                        </div>
                        <div className={cx('item-list')}>
                            <div className={cx('item-title')}>Điều khoản</div>
                            <div className={cx('item')}>Thông tin</div>
                            <div className={cx('item')}>Thông tin</div>
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
