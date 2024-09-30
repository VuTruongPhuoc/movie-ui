import classNames from 'classnames/bind';
import styles from './RowSlider.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

// let length = filmsList.length;
// let filmsFirstHalfList = filmsList.slice(-length, -length + 8);
// let firmsSecondHalfList = filmsList.slice(-length + 8);

// filmsList = [...firmsSecondHalfList, ...filmsList, , ...filmsFirstHalfList];

const RowSlider = ({ title, filmsList }) => {
    console.log(filmsList);
    const [imageIndex, setImageIndex] = useState(0);

    const containerRef = useRef(null);
    const childItemRef = useRef(null);
    const setImageRightArrow = () => {
        setImageIndex((prevIndex) => {
            if (prevIndex === filmsList.length - 7) {
                return filmsList.length - 7;
            } else {
                return prevIndex + 1;
            }
        });
    };
    const handleClickLeftArrow = () => {
        setImageIndex((prevIndex) => {
            if (prevIndex === 0) return 0;
            else return prevIndex - 1;
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
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.transform = `translateX(-${(100 / 6) * imageIndex}%)`;
        }
    }, [imageIndex]);
    return (
        <div className={cx('wrapper')}>
            <section className={cx('row-slider')}>
                <div className={cx('row-content')}>
                    <h2 className={cx('title')}>{title}</h2>
                    <div className={cx('child-container')} ref={containerRef}>
                        {filmsList &&
                            filmsList.map((child, index) => (
                                <Link
                                    className={cx('child-item')}
                                    key={index}
                                    ref={childItemRef}
                                    to={config.routes.album}
                                >
                                    <div className={cx('img-area')}>
                                        <img className={cx('child-img')} src={child.imageUrl} alt={child.name} />
                                        <span className={cx('child-episode')}>{child.numberOfEpisodes}</span>
                                    </div>

                                    <span className={cx('child-name')}>{child.name}</span>
                                </Link>
                            ))}
                    </div>
                </div>
                <div className={cx('slider-arrows')}>
                    <div className={cx('left-arrow')} role="button" onClick={handleClickLeftArrow}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <div className={cx('right-arrow')} onClick={handleClickRightArrow}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div>
            </section>
            <div className={cx('detail-pop-modal')}>
                <div className={cx('pop-container')}>
                    <div className={cx('pop-img')}></div>
                    <div className={cx('pop-content')}>
                        <div className={cx('film-name')}>Black Myth: WuKong</div>
                        <div className={cx('film-info')}>
                            <div className={cx('rate')}>
                                <FontAwesomeIcon icon={faStar} /> 8.0
                            </div>
                            <div className={cx('film-type')}>Phim bộ</div>
                            <div className={cx('year')}>2024</div>
                        </div>
                        <div className={cx('category')}>
                            <span>Hành động</span>
                        </div>
                        <div className={cx('brief')}>
                            Bối cảnh vùng cao cùng những tình tiết chân thực, gần gũi đã giúp phim nhanh chóng chiếm
                            được cảm tình của người xem, đặc biệt là giới trẻ. Phim kể về Pu, một cô gái người Dao trẻ
                            tuổi, có hoàn cảnh gia đình khó khăn với người cha nát rượu và gánh nặng tài chính. Dù vậy,
                            Pu vẫn mạnh mẽ vươn lên, đỗ vào một trường đại học ở thành phố. Tuy nhiên, khi nhận được
                            giấy báo trúng tuyển, cô lại phải đối mặt với nhiều thử thách mới, trong đó có việc ông bố
                            không cho Pu đi học và muốn gán cô trả nợ.
                        </div>
                    </div>
                    <div className={cx('episode-more-info')}>
                        Xem thêm <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RowSlider;
