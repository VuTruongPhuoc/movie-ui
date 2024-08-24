import React from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header />
            </div>
            <div className={cx('container')}>
                <div className={cx('image')}>
                    <img
                        src="https://occ-0-395-58.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABX3v1FtswNV1idfGdU-j3GjxljwY7EK08AM2UaQ4ljeIcgdIrP9Od5QY9IXXBnP5V2rJKDPxaw-U_BkXgAHCXK5HaG230Q8Woycq.webp?r=85a"
                        alt=""
                    />
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
};

export default DefaultLayout;
