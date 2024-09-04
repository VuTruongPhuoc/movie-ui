import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Modal = ({ children, onClose }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('global-modal')}>
                <div className={cx('modal-container')}>
                    <div className={cx('modal-close')} onClick={onClose}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>

                    {children}
                </div>
                <div className={cx('modal-mask')}></div>
            </div>
        </div>
    );
};

export default Modal;
