import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Nav.module.scss';

const cx = classNames.bind(styles);

const Nav = ({ children }) => {
    return <div className={cx('primary-nav')}> {children}</div>;
};
Nav.propTypes = {
    children: PropTypes.node.isRequired,
};
export default Nav;
