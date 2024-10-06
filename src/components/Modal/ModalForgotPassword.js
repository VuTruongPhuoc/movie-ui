import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import * as authServices from '~/services/authServices';
import styles from './Modal.module.scss';
import Button from '../Button';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const ModalForgotPassword = ({ onClickBack }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = async () => {
        try {
            console.log(email);
            const response = await authServices.forgotPassword(email);
            setEmail('');
            toast.info(response.message, { duration: 5000 });
        } catch (err) {}
    };

    return (
        <div className={cx('modal-login')}>
            <header className={cx('login-header')}>
                <p className={cx('title')}>Quên mật khẩu?</p>
            </header>
            <div className={cx('modal-login-content')}>
                <div className={cx('modal-body')}>
                    <p className={cx('label')}>Email: </p>
                    <input
                        className={cx('input')}
                        name="email"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Nhập email"
                    />
                    <div className={cx('modal-content-btn')}>
                        <Link className={cx('forgot-password')} onClick={onClickBack} style={{ fontSize: '1.4rem' }}>
                            Quay lại
                        </Link>
                        <Button primary className={cx('modal-btn')} onClick={handleSubmit}>
                            Đặt lại mật khẩu
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalForgotPassword;
