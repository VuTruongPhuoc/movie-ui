import React, { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Nav.module.scss';

const cx = classNames.bind(styles);

const NavItem = forwardRef(({ title, to }, ref) => {
    return (
        <NavLink className={({ isActive }) => cx('nav-item', { active: isActive })} to={to} ref={ref}>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
});

export default NavItem;
