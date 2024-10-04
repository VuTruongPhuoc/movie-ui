import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

const Modal = ({ children, onClose, title }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('global-modal')}>
                <div className={cx('modal-container')}>
                    <div className={cx('modal-header')}>
                        <div className={cx('modal-title')}>{title}</div>
                        <div className={cx('modal-close')} onClick={onClose}>
                            <FontAwesomeIcon icon={faClose} />
                        </div>
                    </div>
                    {children}
                </div>
                <div className={cx('modal-mask')}></div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Modal;
