import React from 'react';

import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Button = ({ to, href, primary, disabled = false, text = false, children, className, onClick, passProps }) => {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        disabled,
        text,
    });

    return (
        <>
            <Comp className={classes} {...props}>
                <span className={cx('title')}>{children}</span>
            </Comp>
        </>
    );
};

export default Button;
