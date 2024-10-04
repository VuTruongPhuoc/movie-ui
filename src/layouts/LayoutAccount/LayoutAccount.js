import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './LayoutAccount.module.scss';
import Sidebar from '~/layouts/components/Sidebar';
import DefaultLayout from '../DefaultLayout';
import { chain } from 'lodash';

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

LayoutAccount.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LayoutAccount;
