import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import Button from '../Button';

const cx = classNames.bind(styles);

const ModalRegister = ({ onClickLogin }) => {
    return (
        <div className={cx('modal-login')}>
            <header className={cx('modal-header')}>
                <p className={cx('title')}>Đăng ký</p>
            </header>
            <div className={cx('modal-login-content')}>
                <div className={cx('modal-body')}>
                    <p className={cx('label')}>Tài khoản: </p>
                    <input
                        className={cx('input')}
                        name="username"
                        type="text"
                        required
                        placeholder="Nhập tên tài khoản"
                    />
                    <p className={cx('label')}>Email: </p>
                    <input
                        className={cx('input')}
                        name="email"
                        type="email"
                        required
                        placeholder="Nhập email của bạn"
                    />
                    <p className={cx('label')}>Mật khẩu: </p>
                    <input
                        className={cx('input')}
                        name="password"
                        type="password"
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
                            Đăng Ký
                        </Button>
                    </div>
                </div>
            </div>
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
