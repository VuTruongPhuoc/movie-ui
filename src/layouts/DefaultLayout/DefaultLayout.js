import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import Slider from '../components/Slider';

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
    const [isScroll, setIsScroll] = useState(false);
    window.addEventListener('scroll', () => {
        setIsScroll(window.scrollY > 0);
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header', { scrolled: isScroll })}>
                <Header />
            </div>
            <div className={cx('container')}>
                <div className={cx('slider')}>
                    <Slider />
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
