import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import Button from '../Button';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import * as filmServices from '~/services/filmServices';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const ModalChangeFilmPoster = (props) => {
    const { data, handleClose, handleRefresh } = props;
    const [poster, setPoster] = useState(null);
    const inputRef = useRef(null);

    const handlePosterClick = () => {
        inputRef.current.click();
    };

    const handlePosterChange = (e) => {
        const file = e.target.files[0];
        setPoster(file);
    };

    const handleAccept = async () => {
        const fetchApi = async () => {
            try {
                const response = await filmServices.changeFilmPoster(data.id, poster);
                if (response && response.success) {
                    handleRefresh();
                    handleClose();
                }
                toast.success(response.message);
            } catch (err) {
                console.log(err);
                if (!err.response) {
                    toast.error('Có lỗi xảy ra trong quá trình thay đổi ảnh');
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
                {poster ? (
                    <img src={URL.createObjectURL(poster)} alt="Preview" />
                ) : (
                    <p>Chưa có hình ảnh nào được chọn</p>
                )}

                <input type="file" ref={inputRef} onChange={handlePosterChange} style={{ display: 'none' }} />

                <Button
                    primary
                    leftIcon={<FontAwesomeIcon icon={faUpload} />}
                    onClick={handlePosterClick}
                    className={cx('btn-upload')}
                >
                    Tải ảnh lên
                </Button>
                <Button primary onClick={handleAccept} disabled={!poster}>
                    Đồng ý
                </Button>
            </div>
        </div>
    );
};

export default ModalChangeFilmPoster;
