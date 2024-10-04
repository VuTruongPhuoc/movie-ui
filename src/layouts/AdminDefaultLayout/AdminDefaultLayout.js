import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

import styles from './AdminDefaultLayout.module.scss';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Breadcrumb from './components/Breadcrumb';

const cx = classNames.bind(styles);

function AdminDefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header />
            </div>
            <aside className={cx('sidebar')}>
                <Sidebar />
            </aside>
            <div className={cx('container')}>
                <div className={cx('content-wrapper')}>
                    <div className={cx('breadcrumb')}>
                        <Breadcrumb />
                    </div>
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
            <ToastContainer autoClose={2000} />
        </div>
    );
}

AdminDefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminDefaultLayout;
