import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import Button from '../Button';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import * as userServices from '~/services/userServices';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const ModalChangeAvatar = (props) => {
    const { user, handleClose } = props;
    const [image, setImage] = useState(null);
    const inputRef = useRef(null);

    const handleImageClick = () => {
        inputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleAccept = async () => {
        const fetchApi = async () => {
            try {
                const response = await userServices.changeAvatar(user.userName, user.avatar, image);
                if (response && response.success) {
                    handleClose();
                }
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
        <div className={cx('wrapper')}>
            <div className={cx('upload-area')}>
                {image ? <img src={URL.createObjectURL(image)} alt="Preview" /> : <p>Chưa có hình ảnh nào được chọn</p>}

                <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />

                <Button
                    primary
                    leftIcon={<FontAwesomeIcon icon={faUpload} />}
                    onClick={handleImageClick}
                    className={cx('btn-upload')}
                >
                    Tải ảnh lên
                </Button>
                <Button primary onClick={handleAccept} disabled={!image}>
                    Đồng ý
                </Button>
            </div>
        </div>
    );
};

export default ModalChangeAvatar;
