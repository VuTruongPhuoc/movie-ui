import { useRef, useState, useContext, forwardRef } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './Modal.module.scss';
import Button from '../Button';
import AuthContext from '~/context/AuthProvider';

const cx = classNames.bind(styles);

const ModalLogin = forwardRef(({ onClickRegister }, ref) => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        login(username, password);
    };

    return (
        <div className={cx('modal-login')}>
            <header className={cx('login-header')}>
                <p className={cx('title')}>Đăng nhập</p>
            </header>
            <form onSubmit={handleSubmitEvent} ref={ref}>
                <div className={cx('modal-login-content')}>
                    <div className={cx('modal-body')}>
                        <p className={cx('label')}>Username: </p>
                        <input
                            className={cx('input')}
                            name="username"
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                            placeholder="Nhập tên tài khoản"
                        />
                        <p className={cx('label')}>Password: </p>
                        <input
                            className={cx('input')}
                            name="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            placeholder="Nhập mật khẩu"
                        />
                        <div className={cx('modal-content-btn')}>
                            <Link className={cx('forgot-password')}>Quên mật khẩu?</Link>
                            <Button primary className={cx('modal-btn')}>
                                Xác nhận
                            </Button>
                        </div>
                    </div>
                </div>
            </form>

            <div className={cx('modal-footer')}>
                <p className={cx('footer-content')}>Không có tài khoản?</p>
                <Link className={cx('footer-link')} onClick={onClickRegister}>
                    Đăng ký
                </Link>
            </div>
        </div>
    );
});

export default ModalLogin;
