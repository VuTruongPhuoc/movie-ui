import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { Link } from 'react-router-dom';
import Button from '../Button';

const cx = classNames.bind(styles);

const ModalLogin = ({ onClickRegister }) => {
    return (
        <div className={cx('modal-login')}>
            <header className={cx('modal-header')}>
                <p className={cx('title')}>Login</p>
            </header>
            <div className={cx('modal-login-content')}>
                <div className={cx('modal-body')}>
                    <p className={cx('label')}>Username: </p>
                    <input
                        className={cx('input')}
                        name="username"
                        type="text"
                        required
                        placeholder="Nhập tên tài khoản"
                    />
                    <p className={cx('label')}>Password: </p>
                    <input
                        className={cx('input')}
                        name="password"
                        type="password"
                        required
                        placeholder="Nhập mật khẩu"
                    />
                    <div className={cx('modal-content-btn')}>
                        <Link className={cx('forgot-password')}>Quên mật khẩu?</Link>
                        <Button primary className={cx('modal-btn')}>
                            Đăng nhập
                        </Button>
                    </div>
                </div>
            </div>
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
