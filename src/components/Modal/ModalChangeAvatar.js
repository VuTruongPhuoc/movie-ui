import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import Button from '../Button';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

const ModalChangeAvatar = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('upload-area')}>
                <input type="file" name="avatar" />
                <Button primary leftIcon={<FontAwesomeIcon icon={faUpload} />}>
                    Tải ảnh lên
                </Button>
            </div>
        </div>
    );
};

export default ModalChangeAvatar;
