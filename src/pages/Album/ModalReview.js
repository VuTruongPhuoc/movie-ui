import { Modal } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import * as reviewServices from '~/services/reviewServices';
import styles from './Album.module.scss';
import { toast } from 'react-toastify';
import { isLoggedIn } from '~/services/authServices';

const cx = classNames.bind(styles);

const stars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const ModalReview = (props) => {
    const { show, handleClose, filmId } = props;
    const [numberOfStar, setNumberOfStar] = useState(0);
    const [currentReview, setCurrentReview] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const result = await reviewServices.getByFilm(filmId);
            if (result) {
                setNumberOfStar(result.rate);
                setCurrentReview(result);
            }
        };
        fetchData();
    }, [filmId]);

    const handleStarClick = (value) => {
        if (!isLoggedIn()) {
            toast.info('Bạn chưa đăng nhập');
        } else {
            setNumberOfStar(value);
        }
    };

    const handleSave = async () => {
        if (numberOfStar > 0) {
            if (!currentReview) {
                const response = await reviewServices.add({
                    filmid: filmId,
                    rate: numberOfStar,
                });
                if (response && response.success) {
                    toast.success(response.message);
                    handleClose();
                }
            } else {
                const response = await reviewServices.update(currentReview.id, numberOfStar);
                if (response && response.success) {
                    toast.success(response.message);
                    handleClose();
                }
            }
        }
    };

    const handleSubmit = () => {
        if (!isLoggedIn()) {
            toast.info('Bạn chưa đăng nhập');
        } else {
            handleSave();
        }
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: '1.8rem' }}>Đánh giá phim</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('rated-star')}>
                        {stars.map((item, index) => (
                            <span
                                rate={item}
                                className={cx('star-item', { active: numberOfStar >= item })}
                                onClick={() => handleStarClick(Number(item))}
                                key={index}
                            >
                                <FontAwesomeIcon icon={faStar} />
                            </span>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Lưu đánh giá
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalReview;
