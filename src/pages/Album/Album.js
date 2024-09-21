import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Fragment, useRef, useState } from 'react';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faPlay, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import FilmPropose from './FilmPropose';
import styles from './Album.module.scss';

const cx = classNames.bind(styles);
const film = {
    img: 'https://gophim.co/storage/images/tinh-yeu-tro-ve-mai-am/tinh-yeu-tro-ve-mai-am-1.jpg',
    name: 'One Piece',
    content:
        'Monkey D. Luffy là một cậu bé đam mê Đảo Hải Tặc và ước mơ trở thành Vua Hải Tặc. Khi cậu nhỏ, Luffy ăn phải trái quỉ Gomu Gomu, biến cơ thể cậu thành cao su nhưng không biết bơi. Sau khi được Shank cứu thoát và để lại cho cậu chiếc mũ rơm, Luffy quyết định trở thành 1 cướp biển thực thụ để tìm kho báu One Piece và trở thành Vua Hải Tặc. Liệu Luffy có thể hoàn thành ước mơ của mình không? Hãy theo dõi câu chuyện hấp dẫn này trong phim Đảo Hải Tặc (One Piece)',
    genre: [
        {
            id: 1,
            name: 'action',
        },
        {
            id: 2,
            name: 'adventure',
        },
    ],
    episode: [
        {
            id: 1,
            name: 'Tập 1',
            description: 'Mô tả về tập 1',
        },
        {
            id: 2,
            name: 'Tập 2',
            description: 'Mô tả về tập 2',
        },
        {
            id: 3,
            name: 'Tập 3',
            description: 'Mô tả về tập 3',
        },
        {
            id: 4,
            name: 'Tập 4',
            description: 'Mô tả về tập 4',
        },
    ],
};

const filmProPoseList = [
    {
        img: 'https://gophim.co/storage/hinh-anh/vong-xoay-than-toc-phan-6-thumb.jpg',
        newepisode: '22',
        name: 'one piece',
    },
    {
        img: 'https://gophim.co/storage/hinh-anh/vong-xoay-than-toc-phan-6-thumb.jpg',
        newepisode: '22',
        name: 'naruto',
    },
    {
        img: 'https://gophim.co/storage/hinh-anh/vong-xoay-than-toc-phan-6-thumb.jpg',
        newepisode: '22',
        name: 'marvel',
    },
    {
        img: 'https://gophim.co/storage/hinh-anh/vong-xoay-than-toc-phan-6-thumb.jpg',
        newepisode: '22',
        name: 'jack',
    },
    {
        img: 'https://gophim.co/storage/hinh-anh/vong-xoay-than-toc-phan-6-thumb.jpg',
        newepisode: '22',
        name: 'messi',
    },
    {
        img: 'https://gophim.co/storage/hinh-anh/vong-xoay-than-toc-phan-6-thumb.jpg',
        newepisode: '22',
        name: 'messi',
    },
    {
        img: 'https://gophim.co/storage/hinh-anh/vong-xoay-than-toc-phan-6-thumb.jpg',
        newepisode: '22',
        name: 'messi',
    },
    {
        img: 'https://gophim.co/storage/hinh-anh/vong-xoay-than-toc-phan-6-thumb.jpg',
        newepisode: '22',
        name: 'messi',
    },
];

const buttonsNav = [{ name: 'Đề xuất cho bạn' }, { name: 'Danh sách tập' }];
const Album = () => {
    const [isExpanded, setIsExpaned] = useState(false);
    const [state, setState] = useState(buttonsNav[0]);
    const [defaultActive, setDefaultActive] = useState(buttonsNav[0]);
    const [isActive, setIsActive] = useState(true);

    const divref = useRef();
    if (divref.current) {
        divref.current.style.webkitLineClamp = isExpanded ? 'unset' : 3;
    }
    const handleClickExpaned = () => {
        setIsExpaned(!isExpanded);
    };
    const handleClickNav = (name) => {
        setState({ active: name });
        setDefaultActive();
        setIsActive(!isActive);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('film-banner')}>
                <div className={cx('row')}>
                    <div className={cx('col-left')}>
                        <div className={cx('film-info')}>
                            <div className={cx('film-info-title')}>
                                <h1> {film.name}</h1>
                            </div>
                            <div className={cx('film-info-top')}>
                                <span className={cx('top')}>Đang chiếu</span>
                                One piece (Luffy)
                            </div>
                            <div className={cx('film-info-detail')}>
                                <div className={cx('rate')}>
                                    <FontAwesomeIcon icon={faStar} /> 8.0
                                </div>
                                <div className={cx('year')}>2024</div>
                                <div className={cx('film-type')}>Phim bộ</div>
                            </div>
                            <div className={cx('film-info-tag')}>
                                <span className={cx('key')}>Thể loại: </span>
                                {film.genre.map((item, index) => (
                                    <Fragment key={index}>
                                        <Link to="">{item.name}</Link>
                                        {index < film.genre.length - 1 ? ', ' : ''}
                                    </Fragment>
                                ))}
                            </div>
                            <div className={cx('film-info-content')} ref={divref}>
                                {film.content}
                                <div className={cx('more-info')} onClick={handleClickExpaned}>
                                    <span className={cx('more-info-text')}>
                                        {isExpanded ? 'Thu gọn giới thiệu' : 'Hiển thị thêm'}
                                    </span>
                                    <div className={cx('more-info-icon')}>
                                        {isExpanded ? (
                                            <FontAwesomeIcon icon={faChevronUp} />
                                        ) : (
                                            <FontAwesomeIcon icon={faChevronDown} />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={cx('film-info-desc')}>
                                <div className={cx('group-btn')}>
                                    <Button
                                        className={cx('btn-play')}
                                        leftIcon={<FontAwesomeIcon icon={faPlay} />}
                                        primary
                                        to="/watch"
                                    >
                                        Xem phim
                                    </Button>
                                </div>
                                <div className={cx('film-info-btn')}>How date</div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-right')}>
                        <div className={cx('film-img')}>
                            <img
                                src="https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp"
                                alt=""
                            />
                        </div>
                        <div className={cx('left-layer')}></div>
                        <div className={cx('bottom-layer')}></div>
                    </div>
                </div>
            </div>
            <div className={cx('film-option')}>
                <div className={cx('col')}>
                    <div className={cx('nav')}>
                        {buttonsNav.map((item, index) => (
                            <Button
                                key={index}
                                className={cx('nav-item', {
                                    active: defaultActive === item || state.active === item.name,
                                })}
                                onClick={() => handleClickNav(item.name)}
                            >
                                {item.name}
                            </Button>
                        ))}
                    </div>
                    <div className={cx('content')}>
                        {isActive ? (
                            <FilmPropose filmProPoseList={filmProPoseList} />
                        ) : (
                            <div className={cx('film-episodes-list')}>
                                {film.episode.map((item, index) => (
                                    <div className={cx('film-episode-item')}>
                                        <div className={cx('episode-img')}>
                                            <img src={film.img} alt="" />
                                            <div className={cx('episode-play')}>
                                                <FontAwesomeIcon icon={faPlayCircle} className={cx('episode-icon')} />
                                            </div>
                                        </div>
                                        <div className={cx('episode-name')} key={index} src="" alt="">
                                            {film.name + ' - ' + item.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Album;
