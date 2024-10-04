import React, { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import * as filmServices from '~/services/filmServices';
import { removeTags } from '~/utils/removeTags';
import Button from '~/components/Button';
import styles from './Slider.module.scss';
import { getRandom } from '~/utils/getRandom';

const cx = classNames.bind(styles);

const Slider = () => {
    const [imageIndex, setImageIndex] = useState(0);
    const [films, setFilms] = useState([]);

    useEffect(() => {
        const fetchFilmData = async () => {
            const result = await filmServices.getall();
            const randomFilms = getRandom(result, 5);
            setFilms(randomFilms);
        };
        fetchFilmData();
    }, []);

    const setImageRightArrow = () => {
        setImageIndex((prevIndex) => {
            if (films.length) {
                return prevIndex === films.length - 1 ? 0 : prevIndex + 1;
            }
            return prevIndex;
        });
    };

    const handleClickLeftArrow = () => {
        setImageIndex((prevIndex) => {
            if (films.length) {
                return prevIndex === 0 ? films.length - 1 : prevIndex - 1;
            }
            return prevIndex;
        });
    };

    const handleClickRightArrow = () => {
        setImageRightArrow();
    };

    useEffect(() => {
        const intervalId = setInterval(setImageRightArrow, 5000);
        return () => clearInterval(intervalId);
    }, [films]);

    return (
        <div className={cx('slider-column')}>
            <div className={cx('slider-images')}>
                {films.map((item, index) => (
                    <div className={cx('image-item')} key={index}>
                        <img
                            src={item.posterUrl}
                            className={cx('image-item-slider')}
                            alt={films[imageIndex].name} // Cung cấp giá trị alt cho ảnh
                            style={{ translate: `${-100 * imageIndex}%` }} // Sử dụng transform
                        />
                        <div className={cx('image-content')}>
                            <div className={cx('film-info')}>
                                <div className={cx('film-info-title')}>
                                    <h1>{films[imageIndex].name}</h1>
                                </div>
                                <div className={cx('film-info-top')}>
                                    <span className={cx('top')}>Đang chiếu</span>
                                    {films[imageIndex].originName}
                                </div>
                                <div className={cx('film-info-detail')}>
                                    <div className={cx('rate')}>
                                        <FontAwesomeIcon icon={faStar} /> {films[imageIndex].review.avgRate.toFixed(1)}
                                    </div>
                                    <div className={cx('year')}>{films[imageIndex].year}</div>
                                    <div className={cx('film-type')}>Phim bộ</div>
                                </div>
                                <div className={cx('film-info-tag')}>
                                    <span className={cx('key')}>Thể loại: </span>
                                    {films[imageIndex].categories.map((category, index) => (
                                        <Fragment key={index}>
                                            <Link to="">{category.name}</Link>
                                            {index < films[imageIndex].categories.length - 1 ? ', ' : ''}
                                        </Fragment>
                                    ))}
                                </div>
                                <div className={cx('film-info-content')}>
                                    {removeTags(films[imageIndex].description)}
                                </div>
                                <div className={cx('film-info-desc')}>
                                    <div className={cx('group-btn')}>
                                        <Button
                                            className={cx('btn-play')}
                                            leftIcon={<FontAwesomeIcon icon={faPlay} />}
                                            primary
                                            to={`/watch/${films[imageIndex].slug}/tap-1`} // Cập nhật đường dẫn
                                        >
                                            Phát
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                {films.map((item, index) => (
                    <span
                        key={index}
                        className={cx('pag-indicator', { active: index === imageIndex })}
                        onClick={() => setImageIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Slider;
