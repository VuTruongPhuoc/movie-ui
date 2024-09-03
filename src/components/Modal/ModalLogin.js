import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import Modal from './Modal';

const cx = classNames.bind(styles);

const ModalLogin = () => {
    return (
        <Modal>
            <div className={cx('modal-login-content')}>
                <header className={cx('modal-header')}>Log in to TikTok</header>
                <div className={cx('modal-options-list')}>
                    <div className={cx('modal-option-item')}>
                        <p className={cx('label')}>Use phone / email / username</p>
                    </div>
                </div>
            </div>
            <div className={cx('modal-footer')}>
                <p className={cx('footer-content')}>Don’t have an account?</p>
                <a className={cx('footer-link')}>Sign up</a>
            </div>
        </Modal>
    );
};

export default ModalLogin;
