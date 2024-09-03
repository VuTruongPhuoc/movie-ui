import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Modal = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('modal-container')}>
                <div className={cx('modal-close')}>
                    <span>
                        <FontAwesomeIcon icon={faClose} />
                    </span>
                </div>

                {children}
            </div>
        </div>
    );
};

export default Modal;
