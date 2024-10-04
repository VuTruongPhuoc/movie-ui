import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';
import { propTypes } from 'react-bootstrap/esm/Image';

const cx = classNames.bind(styles);

const Button = ({
    to,
    href,
    primary,
    option,
    cancel,
    disabled = false,
    text = false,
    children,
    leftIcon,
    rightIcon,
    className,
    onClick,
    passProps,
}) => {
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
        cancel,
        option,
        disabled,
        text,
    });

    return (
        <>
            <Comp className={classes} {...props}>
                {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
                <span className={cx('title')}>{children}</span>
                {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
            </Comp>
        </>
    );
};

Button.propTypes = {
    // to: propTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    option: PropTypes.bool,
    cancel: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
};
export default Button;
