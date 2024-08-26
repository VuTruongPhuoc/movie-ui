import classNames from 'classnames/bind';
import styles from './RowSlider.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

const filmsList = [
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        name: 'Sieu nhan',
    },
];

const RowSlider = ({ title }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const containerRef = useRef(null);

    const setImageRightArrow = () => {
        setImageIndex((prevIndex) => {
            if (prevIndex === filmsList.length - 6) return 0;
            else return prevIndex + 1;
        });
    };

    const handleClickLeftArrow = () => {
        setImageIndex((prevIndex) => {
            console.log(prevIndex);
            if (prevIndex === 0) return filmsList.length - 6;
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
    return (
        <div className={cx('wrapper')}>
            <section className={cx('row-slider')}>
                <div className={cx('row-content')}>
                    <h2 className={cx('title')}>{title}</h2>
                    <div
                        className={cx('child-container')}
                        style={{ translate: `${(-100 / 6) * imageIndex}%` }}
                        ref={containerRef}
                    >
                        {console.log(imageIndex)}
                        {filmsList.map((child, index) => (
                            <div className={cx('child-item')} key={index}>
                                <img className={cx('child-img')} src={child.img} alt={child.name} />
                                <span className={cx('child-name')}>{child.name}</span>
                            </div>
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
