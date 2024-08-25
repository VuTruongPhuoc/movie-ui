import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const imagesUrl = [
    'https://gophim.co/storage/images/du-toi-khong-phai-nguoi-hung-poster.jpg',
    'https://gophim.co/storage/images/thach-ma-dam-yeu/c29dd17e068eafbcfc8c35d848983c34.jpg',
    'https://gophim.co/storage/images/hieu-trieu-tich-poster.jpg',
];

const Slider = () => {
    const [imageIndex, setImageIndex] = useState(0);

    const setImageRightArrow = () => {
        setImageIndex((index) => {
            if (index === imagesUrl.length - 1) return 0;
            else {
                return index + 1;
            }
        });
    };

    const handleClickLeftArrow = () => {
        setImageIndex((index) => {
            if (index === 0) return imagesUrl.length - 1;
            else {
                return index - 1;
            }
        });
    };
    const handleClickRightArrow = () => {
        setImageRightArrow();
    };
    useEffect(() => {
        const intervalId = setInterval(() => {
            setImageRightArrow();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={cx('slider-column')}>
            <div className={cx('slider-images')}>
                {imagesUrl.map((url, index) => (
                    <div className={cx('image-item')}>
                        <img
                            key={index}
                            src={url}
                            className={cx('image-item-slider')}
                            alt=""
                            style={{ translate: `${-100 * imageIndex}%` }}
                        />
                    </div>
                ))}
            </div>
            <div className={cx('slider-arrows')}>
                <div className={cx('left-arrow')} role="button" onClick={handleClickLeftArrow}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                <div className={cx('right-arrow')} onClick={handleClickRightArrow}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
            </div>
            <div className={cx('slider-indicator')}>
                {imagesUrl.map((item, index) => (
                    <span
                        key={index}
                        className={cx('pag-indicator', { active: imagesUrl[imageIndex] === item })}
                        onClick={() => setImageIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Slider;
