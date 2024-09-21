import { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '../Button';
import styles from './Modal.module.scss';
import AuthContext from '~/context/AuthProvider';
import * as authServices from '~/services/authServices';

const cx = classNames.bind(styles);

const ModalRegister = ({ onClickLogin }) => {
    const [username, setUsername] = useState('');
    const [displayname, setDisplayname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        const fetchApi = async () => {
            try {
                const response = await authServices.register(email, username, displayname, password);
                login(username, password);
                toast.success(response.message);
            } catch (err) {
                if (!err.response) {
                    toast.error('Server không phản hồi');
                } else {
                    toast.error(err.response.data.message);
                }
            }
        };

        fetchApi();
    };
    return (
        <div className={cx('modal-login')}>
            <header className={cx('modal-header')}>
                <p className={cx('title')}>Đăng ký</p>
            </header>
            <form onSubmit={handleSubmitEvent}>
                <div className={cx('modal-login-content')}>
                    <div className={cx('modal-body')}>
                        <p className={cx('label')}>Tài khoản: </p>
                        <input
                            className={cx('input')}
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Nhập tên tài khoản"
                        />
                        <p className={cx('label')}>Tên hiển thị: </p>
                        <input
                            className={cx('input')}
                            name="displayname"
                            type="text"
                            value={displayname}
                            onChange={(e) => setDisplayname(e.target.value)}
                            required
                            placeholder="Nhập tên hiển thị"
                        />
                        <p className={cx('label')}>Email: </p>
                        <input
                            className={cx('input')}
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Nhập email của bạn"
                        />
                        <p className={cx('label')}>Mật khẩu: </p>
                        <input
                            className={cx('input')}
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Nhập mật khẩu"
                        />
                        <p className={cx('label')}>Nhập lại mật khẩu: </p>
                        <input
                            className={cx('input')}
                            name="password"
                            type="password"
                            required
                            placeholder="Nhập lại mật khẩu"
                        />
                        <div className={cx('modal-content-btn')}>
                            <Link className={cx('forgot-password')}></Link>
                            <Button primary className={cx('modal-btn')}>
                                Xác nhận
                            </Button>
                        </div>
                    </div>
                </div>
            </form>

            <div className={cx('modal-footer')}>
                <p className={cx('footer-content')}>Đã có tài khoản?</p>
                <Link className={cx('footer-link')} onClick={onClickLogin}>
                    Đăng nhập
                </Link>
            </div>
        </div>
    );
};

export default ModalRegister;
