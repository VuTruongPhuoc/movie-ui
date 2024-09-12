import { useRef, useState, useContext } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Modal.module.scss';
import Button from '../Button';
import AuthContext from '~/context/AuthProvider';
import httpRequest from '~/utils/httpRequest';

const cx = classNames.bind(styles);
const LOGIN_URL = 'account/login';

const ModalLogin = ({ onClickRegister }) => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await httpRequest.post(LOGIN_URL, JSON.stringify({ username, password }), {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.token;
            setAuth({ username, password, accessToken });
        } catch (err) {
            if (!err?.response) {
                alert('No Server Response');
            } else if (err.response?.status === 400) {
                alert('Missing username and password');
            } else if (err.response?.status === 401) {
                alert('Unauthorized');
            } else {
                alert('Login failed');
            }
        }
    };

    return (
        <div className={cx('modal-login')}>
            <header className={cx('modal-header')}>
                <p className={cx('title')}>Đăng nhập</p>
            </header>
            <form onSubmit={handleSubmitEvent}>
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
};

export default ModalLogin;
