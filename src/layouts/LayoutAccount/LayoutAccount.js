import React from 'react';
import classNames from 'classnames/bind';

import styles from './LayoutAccount.module.scss';
import Sidebar from '~/layouts/components/Sidebar';
import DefaultLayout from '../DefaultLayout';

const cx = classNames.bind(styles);

const LayoutAccount = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <DefaultLayout>
                <div className={cx('container')}>
                    <div className={cx('sidebar')}>
                        <Sidebar />
                    </div>
                    <div className={cx('content')}> {children} </div>
                </div>
            </DefaultLayout>
        </div>
    );
};

export default LayoutAccount;
